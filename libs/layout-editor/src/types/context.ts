import { BehaviorSubject, Subject } from 'rxjs';
import {
  ElementsStore,
  RelationsStore,
  TemplateConfigStore,
} from '@waveditors/editor-model';
import { useInternalState } from '../hooks';
import { InternalEvents } from './internal-events';
import { EditorEvents, ExternalEvents } from './';

export type Context = {
  events: Subject<EditorEvents>;
  externalEvents: Subject<ExternalEvents>;
  hover: BehaviorSubject<string | null>;
  selected: BehaviorSubject<string | null>;
  internalState: ReturnType<typeof useInternalState>;
  internalEvents: Subject<InternalEvents>;
};

export type ModelContext = {
  elements: ElementsStore['bs'];
  relations: RelationsStore['bs'];
  config: TemplateConfigStore['bs'];
};
