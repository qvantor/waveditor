import { ElementCommon } from '../element/';

export interface Text extends ElementCommon<'text'> {
  params: {
    content: string;
  };
}
