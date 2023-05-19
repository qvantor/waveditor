import { createContext } from 'react';
import { Subject } from 'rxjs';
import {
  ElementsStore,
  UndoRedoEvents,
  SelectedStore,
  HoverStore,
  TemplateConfigStore,
  RelationsStore,
  VariablesStore,
} from '@waveditors/editor-model';
import { EditorEvents, ExternalEvents } from '@waveditors/layout-editor';
import { UndoRedoModule } from '@waveditors/rxjs-react';

export type MailBuilderContext = {
  config: TemplateConfigStore;
  stores: {
    elements: ElementsStore;
    variables: VariablesStore;
    relations: RelationsStore;
    selected: SelectedStore;
    hover: HoverStore;
  };
  editor: {
    events: Subject<EditorEvents>;
    externalEvents: Subject<ExternalEvents>;
  };
  modules: {
    undoRedo: UndoRedoModule<UndoRedoEvents>;
  };
};

export const MailBuilderContext = createContext<MailBuilderContext | null>(
  null
);
