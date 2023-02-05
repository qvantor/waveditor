import {
  createContext,
  useContext,
  useMemo,
  MouseEvent,
  useRef,
  useCallback,
} from 'react';
import { match, P } from 'ts-pattern';
import { BehaviorSubject, Subject } from 'rxjs';
import { TextEditor } from '@waveditors/text-editor';
import styled from 'styled-components';
import { useBehaviorSubject } from '@waveditors/rxjs-react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const passValue = <T,>(value: T): T => value;
const returnValue =
  <T,>(value: T) =>
  (): T =>
    value;
const mapValue = <T, R, L = null>(
  value: T | null | undefined,
  right: (value: T) => R,
  left?: L
) =>
  match(value)
    .with(P.nullish, returnValue(left ?? null))
    .otherwise(right);

const ELEMENT_DATATYPE = 'element';

export interface Layout {
  id: string;
  type: 'layout';
  params: {
    columns: string[][];
  };
}

type LayoutStore = BehaviorSubject<Layout>;

interface Text {
  id: string;
  type: 'text';
  params: {
    content: string;
  };
}

type TextStore = BehaviorSubject<Text>;

interface Img {
  id: string;
  type: 'image';
  params: {
    url: string;
  };
}

type ImgStore = BehaviorSubject<Img>;

export type ElementStore = LayoutStore | TextStore | ImgStore;
export type ElementsStore = BehaviorSubject<Record<string, ElementStore>>;

export type HoverEvents =
  | { type: 'MouseEnter'; payload: string }
  | { type: 'MouseLeave'; payload: null };
export type SelectionEvents =
  | { type: 'ElementSelected'; payload: string }
  | { type: 'ElementUnselected'; payload: null };
export type EditorEvents = HoverEvents | SelectionEvents;

interface Props {
  root: string;
  elements: ElementsStore;
  events: Subject<EditorEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
}

const config = { width: 600 };

const LayoutEditorContext = createContext<Props | null>(null);

const useLayoutEditorContext = () => {
  const context = useContext(LayoutEditorContext);
  if (!context)
    throw new Error(
      'useLayoutEditorContext used outside LayoutEditorContext.Provider'
    );
  return context;
};

const RenderColumn = ({
  column,
  width,
}: {
  column: string[];
  width: number;
}) => {
  return (
    <div className='column' style={{ width }}>
      {column.map((element) => (
        <ElementRender element={element} key={element} width={width} />
      ))}
    </div>
  );
};

const LayoutRender = ({
  element,
  width,
}: {
  element: LayoutStore;
  width: number;
}) => {
  const layout = element.getValue();
  const columnWidth = width / layout.params.columns.length;
  return (
    <table style={{ borderSpacing: 0 }}>
      <tbody>
        <tr className='layout'>
          {layout.params.columns.map((column, i) => (
            <td style={{ padding: 0 }} key={i}>
              <RenderColumn width={columnWidth} column={column} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const TextRender = ({ element }: { element: TextStore }) => {
  const text = element.getValue();
  return <TextEditor onChange={console.log} content={text.params.content} />;
};

const typeSelector = <T extends ElementStore['value']['type']>(type: T) => ({
  value: { type },
});

const ElementRenderSwitch = ({ id, width }: { id: string; width: number }) => {
  const { elements } = useLayoutEditorContext();
  const element = useMemo(() => elements.value[id], [id, elements]);
  return match(element)
    .with(typeSelector('layout'), (element) => (
      <LayoutRender element={element} width={width} />
    ))
    .with(typeSelector('text'), (element) => <TextRender element={element} />)
    .with(typeSelector('image'), (element) => (
      <img src='https://placekitten.com/200/150' alt='cat'/>
    ))
    .exhaustive();
};

const ElementRender = ({
  element,
  width,
}: {
  element: string;
  width: number;
}) => {
  return (
    <div id={element} datatype={ELEMENT_DATATYPE} style={{ width }}>
      <ElementRenderSwitch id={element} width={width} />
    </div>
  );
};

const useElementMouse = (events: Props['events']) => {
  const currentHover = useRef<string>('');

  const setHover = useCallback(
    (payload: string) => {
      events.next({ type: 'MouseEnter', payload });
      currentHover.current = payload;
    },
    [events]
  );
  const clearHover = useCallback(() => {
    events.next({ type: 'MouseLeave', payload: null });
    currentHover.current = '';
  }, [events]);

  const onClick = useCallback(() => {
    match(currentHover.current)
      .with('', () => events.next({ type: 'ElementUnselected', payload: null }))
      .otherwise((payload) =>
        events.next({ type: 'ElementSelected', payload })
      );
  }, [events]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const value = (e.target as Element).closest(
        `div[datatype=${ELEMENT_DATATYPE}]`
      )?.id;

      match(value)
        .with(P.nullish, clearHover)
        .with(P.string, (value) =>
          match(value).with(currentHover.current, noop).otherwise(setHover)
        )
        .exhaustive();
    },
    [setHover, clearHover]
  );

  return { onMouseMove, onMouseLeave: clearHover, onClick };
};

const RectRoot = styled.div`
  position: absolute;
  pointer-events: none;
  background: rgba(39, 174, 96, 0.3);
  outline: 2px solid rgba(39, 174, 96, 1);
  outline-offset: -2px;
`;

const elementIdToDOMRect = (id: string) =>
  mapValue(document.getElementById(id), (element) =>
    element.getBoundingClientRect()
  );

const HoverFrame = () => {
  const { hover, selected } = useLayoutEditorContext();
  const selectedId = useBehaviorSubject(selected);

  const hoverIdToRect = useCallback(
    (value: string | null) =>
      mapValue(value, (value) =>
        // if selected and hovered is equal, hide hovered frame
        match(selectedId)
          .with(value, () => null)
          .otherwise(() => elementIdToDOMRect(value))
      ),
    [selectedId]
  );

  const rect = useBehaviorSubject(hover, hoverIdToRect);

  return mapValue(rect, ({ left, top, width, height }) => (
    <RectRoot style={{ left, top, width, height }} />
  ));
};

const SelectedRect = styled(RectRoot)`
  background: transparent;
  outline: 2px solid rgba(41, 128, 185, 1);
`;

export const SelectedFrame = () => {
  const { selected } = useLayoutEditorContext();
  const selectedToRect = useCallback(
    (selected: string | null) => mapValue(selected, elementIdToDOMRect),
    []
  );
  const rect = useBehaviorSubject(selected, selectedToRect);

  return mapValue(rect, ({ left, top, width, height }) => (
    <SelectedRect style={{ left, top, width, height }} />
  ));
};

export function LayoutEditor(props: Props) {
  const { root, events } = props;
  const { onMouseMove, onMouseLeave, onClick } = useElementMouse(events);

  return (
    <LayoutEditorContext.Provider value={props}>
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ width: config.width, background: 'yellowgreen' }}
      >
        <ElementRender element={root} width={config.width} />
        <HoverFrame />
        <SelectedFrame />
      </div>
    </LayoutEditorContext.Provider>
  );
}

export default LayoutEditor;
