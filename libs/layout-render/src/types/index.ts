import {
  ElementsStore,
  RelationsStore,
  TemplateConfigStore,
} from '@waveditors/editor-model';

export type RenderContext = {
  elements: ElementsStore['bs'];
  relations: RelationsStore['bs'];
  config: TemplateConfigStore['bs'];
};
