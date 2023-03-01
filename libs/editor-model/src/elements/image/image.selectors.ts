import { distinctUntilChanged, map, pipe } from 'rxjs';
import { Image } from './image.types';

export const getImageUrl = (value: Image) => value.params.url;

export const getImageMeta = (value: Image) => value.meta;
export const imageUrlPipe = pipe(map(getImageUrl), distinctUntilChanged());
export const imageMetaPipe = pipe(map(getImageMeta), distinctUntilChanged());
