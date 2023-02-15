import { createContext } from 'react';
import { Subject } from 'rxjs';
import { ElementsStore, UndoRedoEvents } from '@waveditors/editor-model';
import { EditorEvents, ExternalEvents } from '@waveditors/layout-editor';
import { UndoRedoModule } from '@waveditors/rxjs-react';

export type MailBuilderContext = {
  stores: {
    elements: ElementsStore;
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
