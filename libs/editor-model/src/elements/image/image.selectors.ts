import { Image } from './image.types';

export const getImageUrl = (value: Image) => value.params.url;
export const getImageMeta = (value: Image) => value.meta;
