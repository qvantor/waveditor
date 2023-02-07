import {
  createContext,
  useContext,
  useMemo,
  MouseEvent,
  useRef,
  useCallback,
  Fragment,
} from 'react';
import { match, P } from 'ts-pattern';
import {
  BehaviorSubject,
  filter,
  Subject,
  map,
  distinctUntilChanged,
  mergeWith,
  delay,
} from 'rxjs';
import { TextEditor } from '@waveditors/text-editor';
import styled from 'styled-components';
import {
  useBehaviorSubject,
  useObservable,
  useSubscription,
} from '@waveditors/rxjs-react';
import { AiOutlineDrag } from 'react-icons/ai';

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
const COLUMN_DATATYPE = 'column';

export interface Layout {
  id: string;
  type: 'layout';
  params: {
    columns: string[][];
  };
}

export type LayoutStore = BehaviorSubject<Layout>;

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

export type LinkElementToLayoutEvent = {
  type: 'LinkElementToLayout';
  payload: {
    element: string;
    position: {
      layout: string;
      column: number;
      index: number;
      next: boolean;
    };
  };
};
export type UnlinkElementFromLayoutEvent = {
  type: 'UnlinkElementFromLayout';
  payload: string;
};
export type MutationEvents =
  | LinkElementToLayoutEvent
  | UnlinkElementFromLayoutEvent;
export type EditorEvents = HoverEvents | SelectionEvents | MutationEvents;

type RootMouseMoveEvent = { type: 'RootMouseMove'; payload: MouseEvent };
type InternalMouseEvents =
  | RootMouseMoveEvent
  | { type: 'RootClick'; payload: MouseEvent }
  | { type: 'RootMouseLeave'; payload: MouseEvent };

type DragIconMouseDownEvent = { type: 'DragIconMouseDown'; payload: string };
type InternalDndEvents = DragIconMouseDownEvent;

type InternalEvents = InternalMouseEvents | InternalDndEvents;

export const isLayoutStore = (element: ElementStore): element is LayoutStore =>
  element.value.type === 'layout';

interface Props {
  root: string;
  elements: ElementsStore;
  events: Subject<EditorEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
}

const config = { width: 600 };

type LayoutEditorContext = Props & {
  internalState: ReturnType<typeof useLayoutEditorInternalState>;
  internalEvents: Subject<InternalEvents>;
};

const LayoutEditorContextValue = createContext<LayoutEditorContext | null>(
  null
);

const useLayoutEditorContext = () => {
  const context = useContext(LayoutEditorContextValue);
  if (!context)
    throw new Error(
      'useLayoutEditorContext used outside LayoutEditorContext.Provider'
    );
  return context;
};

const RenderColumn = ({
  column,
  width,
  dndPreview,
}: {
  column: string[];
  width: number;
  dndPreview?: LinkElementToLayoutEvent['payload']['position'];
}) => {
  return (
    <div style={{ width }}>
      {column.map((element, i) => {
        const dndHere = dndPreview?.index === i;
        return (
          <Fragment key={element}>
            {dndHere && !dndPreview.next && (
              <div
                style={{ height: 4, border: '1px dashed gray', margin: 5 }}
              />
            )}
            <ElementRender element={element} width={width} />
            {dndHere && dndPreview.next && (
              <div
                style={{ height: 4, border: '1px dashed gray', margin: 5 }}
              />
            )}
          </Fragment>
        );
      })}
      {column.length === 0 && dndPreview && (
        <div style={{ height: 4, border: '1px dashed gray', margin: 5 }} />
      )}
    </div>
  );
};

interface LayoutProps {
  element: LayoutStore;
  width: number;
}

const LayoutRender = ({ element, width }: LayoutProps) => {
  const { internalState } = useLayoutEditorContext();

  const dndPreview = useObservable(
    internalState.dndPreview.pipe(
      map((val) => {
        if (!val) return undefined;
        const { position } = val;
        if (position.layout !== element.value.id) return undefined;
        return position;
      }),
      distinctUntilChanged()
    ),
    null
  );
  const isDnd = useBehaviorSubject(internalState.isDnd);
  const columnStyle = isDnd
    ? {
        outline: '1px dashed red',
        outlineOffset: -1,
      }
    : {};
  const layout = element.getValue();
  const columnWidth = width / layout.params.columns.length;
  return (
    <table style={{ borderSpacing: 0, minHeight: 10 }}>
      <tbody>
        <tr>
          {layout.params.columns.map((column, i) => {
            return (
              <td
                style={{
                  ...columnStyle,
                  padding: 0,
                }}
                datatype={COLUMN_DATATYPE}
                data-column={i}
                key={i}
              >
                <RenderColumn
                  width={columnWidth}
                  column={column}
                  dndPreview={dndPreview?.column === i ? dndPreview : undefined}
                />
              </td>
            );
          })}
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
      <img
        src='https://placekitten.com/200/150'
        style={{ maxWidth: '100%', pointerEvents: 'none' }}
        alt='cat'
      />
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

const useElementSelection = ({
  events,
  internalEvents,
  internalState: { isDnd },
}: LayoutEditorContext) => {
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
    ({ payload }: RootMouseMoveEvent) => {
      const value = (payload.target as Element).closest(
        `[datatype=${ELEMENT_DATATYPE}]`
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

  useSubscription(() =>
    internalEvents
      .pipe(filter(() => !isDnd.value))
      .subscribe((event) =>
        match(event)
          .with({ type: 'RootMouseMove' }, onMouseMove)
          .with({ type: 'RootClick' }, onClick)
          .with({ type: 'RootMouseLeave' }, clearHover)
          .otherwise(noop)
      )
  );
};

const useDnd = ({
  elements,
  internalEvents,
  internalState: { isDnd, dndPreview },
  events,
}: LayoutEditorContext) => {
  useSubscription(() =>
    internalEvents
      .pipe(
        filter(
          (event): event is DragIconMouseDownEvent =>
            event.type === 'DragIconMouseDown'
        )
      )
      .subscribe(({ payload: id }) => {
        isDnd.next(true);
        events.next({ type: 'UnlinkElementFromLayout', payload: id });

        // error in mouseMove MouseEvent type it should not be from react
        const mouseMove = (e: any) => {
          const column = (e.target as HTMLElement).closest(
            `[datatype=${COLUMN_DATATYPE}]`
          );
          const layout = column?.closest(`[datatype=${ELEMENT_DATATYPE}]`);
          const event = match([layout, column])
            .with(P.array(P.not(P.nullish)), ([layout, column]) => {
              const columnIndex = Number(column.getAttribute('data-column'));
              if (Number.isNaN(columnIndex)) return null;
              const element = elements.value[layout.id] as LayoutStore;
              const diffCenter = element.value.params.columns[columnIndex].map(
                (id) => {
                  const htmlChild = document.getElementById(id);
                  if (!htmlChild) return null;
                  const { top, height } = htmlChild.getBoundingClientRect();

                  const center = top + height / 2;
                  return e.clientY - center;
                }
              );
              const { index, next } = diffCenter.reduce(
                (sum, diff, index) => {
                  if (diff && Math.abs(diff) < sum.min)
                    return {
                      min: Math.abs(diff),
                      index,
                      next: diff > 0,
                    };
                  return sum;
                },
                { min: Infinity, index: 0, next: false }
              );
              return {
                element: id,
                position: {
                  layout: layout.id,
                  column: columnIndex,
                  index,
                  next,
                },
              };
            })
            .otherwise(returnValue(null));
          match(event)
            .with(dndPreview.value, noop)
            .otherwise((value) => dndPreview.next(value));
        };
        document.addEventListener('mousemove', mouseMove);

        document.addEventListener('mouseup', () => {
          if (dndPreview.value)
            events.next({
              type: 'LinkElementToLayout',
              payload: dndPreview.value,
            });

          isDnd.next(false);
          dndPreview.next(null);
          document.removeEventListener('mousemove', mouseMove);
        });
      })
  );
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

const DragIcon = styled(AiOutlineDrag)`
  background: white;
  font-size: 10px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: move;
  pointer-events: all;
`;

export const SelectedFrame = () => {
  const { selected, internalEvents, internalState } = useLayoutEditorContext();
  const selectedToRect = useCallback(
    (selected: string | null) => mapValue(selected, elementIdToDOMRect),
    []
  );
  const rect = useObservable(
    selected.pipe(
      mergeWith(internalState.isDnd.pipe(delay(16))),
      map(() => selected.value)
    ),
    selected.value,
    selectedToRect
  );
  if (!rect) return null;

  const { left, top, width, height } = rect;
  return (
    <SelectedRect style={{ left, top, width, height }}>
      <DragIcon
        onMouseDown={() =>
          internalEvents.next({
            type: 'DragIconMouseDown',
            payload: selected.getValue() as string,
          })
        }
      />
    </SelectedRect>
  );
};

const useLayoutEditorInternalState = () => {
  return useMemo(() => {
    const isDnd = new BehaviorSubject(false);
    const dndPreview = new BehaviorSubject<
      null | LinkElementToLayoutEvent['payload']
    >(null);
    return { isDnd, dndPreview };
  }, []);
};

export function LayoutEditor(props: Props) {
  const internalState = useLayoutEditorInternalState();

  const { internalEvents, rootMouseMove, rootClick, rootMouseLeave } =
    useMemo(() => {
      const internalEvents = new Subject<InternalEvents>();
      const generalMouseEvent =
        (type: InternalMouseEvents['type']) => (payload: MouseEvent) =>
          internalEvents.next({ type, payload });

      const rootMouseMove = generalMouseEvent('RootMouseMove');
      const rootClick = generalMouseEvent('RootClick');
      const rootMouseLeave = generalMouseEvent('RootMouseLeave');
      return { internalEvents, rootMouseMove, rootClick, rootMouseLeave };
    }, []);
  const context: LayoutEditorContext = {
    ...props,
    internalState,
    internalEvents,
  };

  useElementSelection(context);
  useDnd(context);

  return (
    <LayoutEditorContextValue.Provider value={context}>
      <div
        onMouseMove={rootMouseMove}
        onMouseLeave={rootMouseLeave}
        onClick={rootClick}
        style={{
          width: config.width,
          background: 'yellowgreen',
          userSelect: 'none',
        }}
      >
        <ElementRender element={props.root} width={config.width} />
        <HoverFrame />
        <SelectedFrame />
      </div>
    </LayoutEditorContextValue.Provider>
  );
}

export default LayoutEditor;
