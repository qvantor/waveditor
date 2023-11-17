import { Lens } from 'monocle-ts';
import { Text } from './text.types';

export const TextContent = Lens.fromPath<Text>()(['params', 'content']);
