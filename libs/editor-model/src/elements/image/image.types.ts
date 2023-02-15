import { ElementCommon } from '../element/element.types';

export interface Image extends ElementCommon<'image'> {
  params: {
    url: string;
  };
}
