import { BehaviorSubject, Subject } from 'rxjs';
import { ElementsStore, TemplateConfigStore } from '@waveditors/editor-model';
import { useInternalState } from '../hooks';
import { InternalEvents } from './internal-events';
import { EditorEvents, ExternalEvents } from './';

export type Context = {
  root: string;
  elements: ElementsStore['bs'];
  config: TemplateConfigStore['bs'];
  events: Subject<EditorEvents>;
  externalEvents: Subject<ExternalEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
  internalState: ReturnType<typeof useInternalState>;
  internalEvents: Subject<InternalEvents>;
};
