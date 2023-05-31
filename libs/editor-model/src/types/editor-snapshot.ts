import { Config, Element, Relations, Variables } from '../';

export type EditorSnapshot = {
  elements: Record<string, Element>;
  relations: Relations;
  config: Config;
  variables: Variables;
};
