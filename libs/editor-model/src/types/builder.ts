import { Subject } from 'rxjs';
import { UndoRedoModule, OnChangeDebounceModule } from '@waveditors/rxjs-react';
import { ElementsStore } from '../elements';
import { HoverStore, SelectedStore } from '../interaction';
import { RelationsStore } from '../relations';
import { ConfigStore } from '../config';
import { VariablesStore } from '../variables';
import { EditorCommands, EditorEvents, UndoRedoEvents } from './';

export type BuilderContext = Readonly<{
  model: {
    elements: ElementsStore;
    relations: RelationsStore;
    config: ConfigStore;
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
    onChange: OnChangeDebounceModule;
  };
}>;
