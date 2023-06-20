import { onChangeDebounceModule, undoRedoModule } from '@waveditors/rxjs-react';
import { Subject } from 'rxjs';
import {
  Element,
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
  BuilderContext,
  EditorCommands,
  EditorEvents,
  EditorSnapshot,
  UndoRedoEvents,
} from '../../types';
import { elementToStoreConstructor } from '../../elements/elements/elements.creators';
import { commonUndoRedoEffect } from '../../services';
import { builderContextToSnapshot } from './mappers';

export const createBuilderContext = (
  initialState: EditorSnapshot
): BuilderContext => {
  const undoRedo = undoRedoModule<UndoRedoEvents>();
  const onChange = onChangeDebounceModule();
  const { createUndoRedoEffect } = undoRedo;

  const config = configStoreConstructor()
    .addEffect(createUndoRedoEffect('ConfigStore'))
    .addEffect(onChange.effect)
    .run(initialState.config);

  const relations = relationsStoreConstructor()
    .addEffect(createUndoRedoEffect('RelationsStore'))
    .addEffect(onChange.effect)
    .run(initialState.relations);

  const variables = variablesStoreConstructor()
    .addEffect(createUndoRedoEffect('VariablesStore'))
    .addEffect(onChange.effect)
    .run(initialState.variables);

  // function for wrap any element json to ElementStore
  // with all effects required
  const toStore = (element: Element) =>
    elementToStoreConstructor(element, { variables })
      .addEffect(commonUndoRedoEffect(undoRedo))
      .addEffect(onChange.effect)
      .run(element);

  const elements = elementsStoreConstructor({ toStore })
    .addEffect(createUndoRedoEffect('ElementsStore'))
    .addEffect(onChange.effect)
    .run(elementsToElementsStore(initialState.elements, toStore));

  const hover = hoverStoreConstructor().run(null);
  const selected = selectedStoreConstructor().run(null);

  return {
    model: { config, relations, variables, elements },
    interaction: { hover, selected },
    editor: {
      events: new Subject<EditorEvents>(),
      commands: new Subject<EditorCommands>(),
    },
    module: { undoRedo, onChange },
  };
};

// handling all subscriptions for BuilderContext
export const builderSubscribe = (
  context: BuilderContext,
  saveVersion: (snap: EditorSnapshot) => void
) => {
  const {
    module: { undoRedo, onChange },
    model: { config, relations, variables, elements },
    interaction: { hover, selected },
  } = context;
  const storeChangeSb = onChange.subscribe(() =>
    saveVersion(builderContextToSnapshot(context))
  );
  const subscriptions = [
    undoRedo,
    config,
    relations,
    variables,
    elements,
    hover,
    selected,
  ].map((value) => value.subscribe());
  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
    storeChangeSb();
  };
};
