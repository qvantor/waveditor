import { Lens } from 'monocle-ts';
import { Text } from './text.types';

export const content = Lens.fromPath<Text>()(['params', 'content']);
