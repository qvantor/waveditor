import { MouseEvent, useMemo } from 'react';
import { Subject } from 'rxjs';
import styled from 'styled-components';
import { useObservable } from '@waveditors/rxjs-react';
import {
  getTemplateDefaultFont,
  selectorToPipe,
} from '@waveditors/editor-model';
import {
  Context,
  ModelContext,
  InternalEvents,
  InternalMouseEvents,
} from '../types';
import { useDnd, useElementSelection, useInternalState } from '../hooks';
import {
  ContextValue,
  ModelContextValue,
  LAYOUT_EDITOR_ID,
} from '../constants';
import { templateConfigFontToStyle } from '../services';
import { HoverFrame } from './hover-frame';
import { SelectedFrame } from './selected-frame';
import { ApplyFonts } from './apply-fonts';
import { Element } from './elements';

const Root = styled.div`
  position: relative;
`;

export function LayoutEditor({
  config,
  relations,
  elements,
  ...props
}: Omit<Context, 'internalEvents' | 'internalState'> & ModelContext) {
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
  const modelContext: ModelContext = {
    config,
    relations,
    elements,
  };
  useElementSelection(context);
  useDnd(context, modelContext);

  const defaultFont = useObservable(
    config.pipe(selectorToPipe(getTemplateDefaultFont)),
    getTemplateDefaultFont(config.getValue())
  );

  const width = config.getValue().viewportWidth;

  return (
    <ModelContextValue.Provider value={modelContext}>
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
          <Element id={config.getValue().rootElementId} width={width} />
          <HoverFrame />
          <SelectedFrame />
          <ApplyFonts />
        </Root>
      </ContextValue.Provider>
    </ModelContextValue.Provider>
  );
}
