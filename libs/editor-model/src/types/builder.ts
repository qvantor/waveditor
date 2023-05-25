import { Subject } from 'rxjs';
import { UndoRedoModule } from '@waveditors/rxjs-react';
import { ElementsStore } from '../elements';
import { HoverStore, SelectedStore } from '../interaction';
import { RelationsStore } from '../relations';
import { TemplateConfigStore } from '../template-config';
import { VariablesStore } from '../variables';
import { EditorEvents, EditorCommands, UndoRedoEvents } from './';

export type BuilderCore = Readonly<{
  model: {
    elements: ElementsStore;
    relations: RelationsStore;
    config: TemplateConfigStore;
    variables: VariablesStore;
  };
  interaction: {
    hover: HoverStore;
    selected: SelectedStore;
  };
  editor: {
    events: Subject<EditorEvents>;
    commands: Subject<EditorCommands>;
  };
  module: {
    undoRedo: UndoRedoModule<UndoRedoEvents>;
  };
  subscribe: () => () => void;
}>;

export type BuilderContext = Omit<BuilderCore, 'subscribe'>;
