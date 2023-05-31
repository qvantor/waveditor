import { elementsStoreToObject } from '../../elements';
import { BuilderContext, EditorSnapshot } from '../../types';

export const builderContextToSnapshot = ({
  model: { config, elements, relations, variables },
}: BuilderContext): EditorSnapshot => ({
  config: config.getValue(),
  relations: relations.getValue(),
  elements: elementsStoreToObject(elements),
  variables: variables.getValue(),
});
