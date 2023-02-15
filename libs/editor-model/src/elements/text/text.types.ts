import { ElementCommon } from '../element/element.types';

export interface Text extends ElementCommon<'text'> {
  params: {
    content: string;
  };
}
