import { fromTraversable, Lens } from 'monocle-ts';
import { indexArray } from 'monocle-ts/Index/Array';
import * as A from 'fp-ts/Array';
import { Column, Layout } from './layout.types';

export const gap = Lens.fromPath<Layout>()(['params', 'gap']);
export const column = Lens.fromPath<Layout>()(['params', 'columns']);
export const columnChildren = Lens.fromProp<Column>()('children');
export const columnStyle = Lens.fromProp<Column>()('style');
export const columnByIndex = (index: number) =>
  indexArray<Column>().index(index);
export const columnTraversal = fromTraversable(A.Traversable)<Column>();
