import { BehaviorSubject, Subject } from 'rxjs';
import { EditorEvents, ExternalEvents } from '@waveditors/editor-model';
import { useInternalState } from '../hooks';
import { InternalEvents } from './internal-events';

export type Context = {
  events: Subject<EditorEvents>;
  externalEvents: Subject<ExternalEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
  internalState: ReturnType<typeof useInternalState>;
  internalEvents: Subject<InternalEvents>;
  iFrameDocument: Document;
};
