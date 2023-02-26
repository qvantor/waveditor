import { ElementCommon } from '../element';

export interface Image extends ElementCommon<'image'> {
  params: {
    url: string;
  };
}
