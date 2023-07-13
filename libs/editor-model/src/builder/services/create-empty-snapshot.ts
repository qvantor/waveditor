import { generateId } from '@waveditors/utils';
import {
  createEmptyColumn,
  createInitialConfig,
  createInitialRelations,
  EditorSnapshot,
} from '../..';

export const createEmptySnapshot = (): EditorSnapshot => {
  const rootId = generateId();
  return {
    config: createInitialConfig(rootId),
    elements: {
      [rootId]: {
        id: rootId,
        type: 'layout',
        name: 'layout',
        params: {
          columns: [createEmptyColumn(100)],
        },
        style: {
          backgroundColor: '#fff',
          margin: '0px auto',
          padding: '20px',
        },
        link: null,
      },
    },
    relations: createInitialRelations(),
    variables: [],
  };
};
