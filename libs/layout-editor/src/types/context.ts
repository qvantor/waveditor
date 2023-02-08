import { BehaviorSubject, Subject } from 'rxjs';
import { ElementsStore } from '@waveditors/editor-model';
import { useInternalState } from '../hooks';
import { InternalEvents } from './internal-events';
import { EditorEvents } from './';

export type Context = {
  root: string;
  elements: ElementsStore;
  events: Subject<EditorEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
  internalState: ReturnType<typeof useInternalState>;
  internalEvents: Subject<InternalEvents>;
};
