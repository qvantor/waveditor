import { Config, Element, Relations, Variables } from '../';

export type RenderContextObject = {
  elements: Record<string, Element>;
  relations: Relations;
  config: Config;
  variables: Variables;
};
