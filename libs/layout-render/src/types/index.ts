import {
  ElementsStore,
  RelationsStore,
  TemplateConfigStore,
  Element,
  Relations,
  TemplateConfig,
  Variables,
  VariablesStore,
} from '@waveditors/editor-model';

export type RenderContextObject = {
  elements: Record<string, Element>;
  relations: Relations;
  config: TemplateConfig;
  variables: Variables;
};

export type RenderContext = {
  elements: ElementsStore['bs'];
  relations: RelationsStore['bs'];
  config: TemplateConfigStore['bs'];
  variables: VariablesStore['bs'];
};
