import { BehaviorSubject, Subject } from 'rxjs';
import { useInternalState } from '../hooks';
import { InternalEvents } from './internal-events';
import { EditorEvents, ElementsStore } from './';

export type Context = {
  root: string;
  elements: ElementsStore;
  events: Subject<EditorEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
  internalState: ReturnType<typeof useInternalState>;
  internalEvents: Subject<InternalEvents>;
};
