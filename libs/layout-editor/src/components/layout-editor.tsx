import { MouseEvent, useMemo } from 'react';
import { Subject } from 'rxjs';
import styled from 'styled-components';
import { useObservable } from '@waveditors/rxjs-react';
import {
  getTemplateDefaultFont,
  selectorToPipe,
} from '@waveditors/editor-model';
import { Context, InternalEvents, InternalMouseEvents } from '../types';
import { useDnd, useElementSelection, useInternalState } from '../hooks';
import { ContextValue, LAYOUT_EDITOR_ID } from '../constants';
import { templateConfigFontToStyle } from '../services';
import { ElementRender } from './element-render';
import { HoverFrame } from './hover-frame';
import { SelectedFrame } from './selected-frame';
import { ApplyFonts } from './apply-fonts';

const Root = styled.div`
  position: relative;
`;

export function LayoutEditor(
  props: Omit<Context, 'internalEvents' | 'internalState'>
) {
  const internalState = useInternalState();

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
  const context: Context = {
    ...props,
    internalState,
    internalEvents,
  };

  useElementSelection(context);
  useDnd(context);

  const defaultFont = useObservable(
    props.config.pipe(selectorToPipe(getTemplateDefaultFont)),
    getTemplateDefaultFont(props.config.getValue())
  );

  const width = props.config.getValue().viewportWidth;

  return (
    <ContextValue.Provider value={context}>
      <Root
        id={LAYOUT_EDITOR_ID}
        onMouseMove={rootMouseMove}
        onMouseLeave={rootMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          rootClick(e);
        }}
        style={{ width, fontFamily: templateConfigFontToStyle(defaultFont) }}
      >
        <ElementRender
          id={props.config.getValue().rootElementId}
          width={width}
        />
        <HoverFrame />
        <SelectedFrame />
        <ApplyFonts />
      </Root>
    </ContextValue.Provider>
  );
}
