import {
  ElementsStore,
  RelationsStore,
  TemplateConfigStore,
  Element,
  Relations,
  TemplateConfig,
} from '@waveditors/editor-model';

export type RenderContextObject = {
  elements: Record<string, Element>;
  relations: Relations;
  config: TemplateConfig;
};

export type RenderContext = {
  elements: ElementsStore['bs'];
  relations: RelationsStore['bs'];
  config: TemplateConfigStore['bs'];
};
