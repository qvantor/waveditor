import { Lens } from 'monocle-ts';
import { ElementCommon, ElementLink } from './element.types';

const Link = Lens.fromNullableProp<ElementCommon>()('link', {
  url: '',
  newTab: false,
});
const Url = Lens.fromProp<ElementLink>()('url');

export const ElementLinkUrl = Link.composeLens(Url);
