import { undoRedoModule } from '@waveditors/rxjs-react';
import { Subject } from 'rxjs';
import {
  elementsStoreConstructor,
  elementsToElementsStore,
} from '../../elements';
import {
  hoverStoreConstructor,
  selectedStoreConstructor,
} from '../../interaction';
import { relationsStoreConstructor } from '../../relations';
import { configStoreConstructor } from '../../config';
import { variablesStoreConstructor } from '../../variables';
import {
  BuilderCore,
  EditorCommands,
  EditorEvents,
  EditorSnapshot,
  UndoRedoEvents,
} from '../../types';

export const createBuilderContext = (
  initialState: EditorSnapshot
): BuilderCore => {
  const undoRedo = undoRedoModule<UndoRedoEvents>();
  const config = configStoreConstructor({
    undoRedo,
  }).run(initialState.config);
  const relations = relationsStoreConstructor({ undoRedo }).run(
    initialState.relations
  );
  const variables = variablesStoreConstructor({ undoRedo }).run(
    initialState.variables
  );
  const elementsDeps = { undoRedo, variables };
  const elements = elementsStoreConstructor(elementsDeps).run(
    elementsToElementsStore(initialState.elements, elementsDeps)
  );

  const hover = hoverStoreConstructor().run(null);
  const selected = selectedStoreConstructor().run(null);

  const subscribe = () => {
    const subscriptions = [
      undoRedo,
      config,
      relations,
      variables,
      elements,
      hover,
      selected,
    ].map((value) => value.subscribe());
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  };

  return {
    model: { config, relations, variables, elements },
    interaction: { hover, selected },
    editor: {
      events: new Subject<EditorEvents>(),
      commands: new Subject<EditorCommands>(),
    },
    module: { undoRedo },
    subscribe,
  };
};
