export type {
  Config,
  ConfigFont,
  ConfigStoreUndoRedoEvent,
  FontChangedPayload,
} from './config.types';
export type { ConfigStore } from './config';
export { configStoreConstructor } from './config';
export { createInitialConfig } from './config.creator';
export * from './config.selectors';
export * from './config.actions';
