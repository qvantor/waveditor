import { ElementCommonTypes } from "../element";
import { Element } from './elements.types';

const isTypeInObject = (value: object): value is { type: unknown } =>
  'type' in value;

const isObjectTypeString = (value: {
  type: unknown;
}): value is { type: string } => typeof value.type === 'string';

export const isElement = (value: object): value is Element =>
  isTypeInObject(value) &&
  isObjectTypeString(value) &&
  (ElementCommonTypes as readonly string[]).includes(value.type);
