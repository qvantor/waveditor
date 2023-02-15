import { StoreResult } from '@waveditors/rxjs-react';
import { elementStore, ElementStoreDeps } from '../element';
import { Image } from './image.types';

export const imageStore = (deps: ElementStoreDeps) => elementStore<Image>(deps);
export type ImageStore = StoreResult<typeof imageStore>;
