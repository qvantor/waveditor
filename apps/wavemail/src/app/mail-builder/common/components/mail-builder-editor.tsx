import { memo } from 'react';
import { useUnsubscribable } from '@waveditors/rxjs-react';
import { match } from 'ts-pattern';
import {
  BuilderProvider,
  createBuilderContext,
  getLayoutElement,
  getParentElement,
  EditorSnapshot,
} from '@waveditors/editor-model';
import { LeftSidebar } from '../../left-sidebar';
import { Canvas } from '../../canvas';
import { Header } from './header';
import { Hotkeys } from './hotkeys';
import { BuilderContextSubscribe } from './builder-context-subscribe';
import { MailBuilderRoot, Content } from './mail-builder.styled';

interface Props {
  snapshot: EditorSnapshot;
}

export const MailBuilderEditor = memo(({ snapshot }: Props) => {
  const builderContext = createBuilderContext(snapshot);

  const {
    model: { elements, config },
    editor: { events },
    interaction: { hover, selected },
    module: { undoRedo },
  } = builderContext;

  useUnsubscribable(
    () =>
      events.subscribe((e) =>
        match(e)
          .with({ type: 'MouseEnter' }, (event) => {
            hover.actions.addHover(event.payload);
          })
          .with({ type: 'MouseLeave' }, () => hover.actions.removeHover())
          .with({ type: 'ElementSelected' }, (event) =>
            selected.actions.setSelected(event.payload)
          )
          .with({ type: 'ElementUnselected' }, selected.actions.unselect)
          .with({ type: 'UnlinkElementFromLayout' }, (event) => {
            const parent = getParentElement(elements.getValue(), event.payload);
            if (!parent)
              return console.error(`UnlinkElementFromLayout: ${event.payload}`);
            undoRedo.startBunch();
            parent.actions.removeChild(event.payload);
          })
          .with({ type: 'LinkElementToLayout' }, ({ payload }) => {
            const parent = getLayoutElement(
              elements.getValue(),
              payload.position.layout
            );
            if (!parent)
              return console.error(
                `LinkElementToLayout: ${payload.position.layout}`
              );
            parent.actions.addChild(payload);
            undoRedo.endBunch();
            if (payload.samePosition) undoRedo.removeLastEvent();
          })
          .with(
            { type: 'AddElement' },
            ({ payload: { element, position } }) => {
              const internalPosition = position ?? {
                layout: config.getValue().rootElementId,
                column: 0,
                index: 0,
              };
              const parent = getLayoutElement(
                elements.getValue(),
                internalPosition.layout
              );
              if (!parent)
                return console.error(
                  `useAddElement: ${internalPosition.layout}`
                );
              undoRedo.startBunch();
              elements.actions.addElement(element);
              parent.actions.addChild({
                element: element.id,
                position: internalPosition,
              });
              undoRedo.endBunch();
              selected.actions.setSelected(element.id);
            }
          )
          .exhaustive()
      ),
    [elements, hover, selected, events]
  );

  return (
    <BuilderProvider value={builderContext}>
      <MailBuilderRoot>
        <Header />
        <Content>
          <LeftSidebar />
          <Canvas />
        </Content>
        <Hotkeys />
        <BuilderContextSubscribe />
      </MailBuilderRoot>
    </BuilderProvider>
  );
});
