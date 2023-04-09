import { RenderContextObject } from '@waveditors/layout-render';
import { generateId } from '@waveditors/utils';
import {
  createInitialRelations,
  createInitialTemplateConfig,
} from '@waveditors/editor-model';
import { LOCAL_STORAGE_KEY } from '../constants';

export const getTemplates = () => {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY);
  const savedProjects: Record<string, RenderContextObject> = value
    ? JSON.parse(value)
    : {};
  return savedProjects;
};

export const generateEmptyTemplate = (): RenderContextObject => {
  const rootId = generateId();
  return {
    config: createInitialTemplateConfig(rootId),
    elements: {
      [rootId]: {
        id: rootId,
        type: 'layout',
        params: {
          columns: [[], []],
        },
        style: {
          backgroundColor: '#fff',
          margin: '0px auto',
          padding: '20px',
        },
      },
    },
    relations: createInitialRelations(),
  };
};
export const getInitialTemplate = (): RenderContextObject => {
  const templates = getTemplates();
  const keys = Object.keys(templates);
  if (keys.length > 0) return templates[keys[0]];
  return generateEmptyTemplate();
};
