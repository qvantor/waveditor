import { ElementCommon } from '../element';

export interface Image extends ElementCommon<'image'> {
  params: {
    url: string;
  };
  meta?: {
    width: number;
    height: number;
  };
}
