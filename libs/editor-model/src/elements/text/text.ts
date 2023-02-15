import { StoreResult } from '@waveditors/rxjs-react';
import { elementStore, ElementStoreDeps } from '../element';
import { Text } from './text.types';

export const textStore = (deps: ElementStoreDeps) => elementStore<Text>(deps);
export type TextStore = StoreResult<typeof textStore>;
