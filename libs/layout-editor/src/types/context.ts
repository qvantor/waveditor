import { Subject } from 'rxjs';
import { useInternalState } from '../hooks';
import { InternalEvents } from './internal-events';

export type Context = {
  internalState: ReturnType<typeof useInternalState>;
  internalEvents: Subject<InternalEvents>;
  iFrameDocument: Document;
};
