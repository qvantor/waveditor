import { Element, Relations, TemplateConfig, Variables } from "../";

export type RenderContextObject = {
  elements: Record<string, Element>;
  relations: Relations;
  config: TemplateConfig;
  variables: Variables;
};
