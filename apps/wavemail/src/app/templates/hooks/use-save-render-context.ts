import { useCallback } from 'react';
import {
  createInitialRelations,
  createInitialTemplateConfig,
  elementsStoreToObject,
} from '@waveditors/editor-model';
import { RenderContextObject } from '@waveditors/layout-render';
import { generateId } from '@waveditors/utils';
import { useMailBuilderContext } from '../../common/hooks';

const KEY = 'wavemail';

export const getTemplates = () => {
  const value = localStorage.getItem(KEY);
  const savedProjects: Record<string, RenderContextObject> = value
    ? JSON.parse(value)
    : {};
  return savedProjects;
};

export const getInitialTemplate = (): RenderContextObject => {
  const templates = getTemplates();
  const keys = Object.keys(templates);
  if (keys.length > 0) return templates[keys[0]];
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
        },
      },
    },
    relations: createInitialRelations(),
  };
};

export const useSaveRenderContext = () => {
  const {
    config,
    stores: { elements, relations },
  } = useMailBuilderContext();
  return useCallback(() => {
    const data = {
      config: config.getValue(),
      relations: relations.getValue(),
      elements: elementsStoreToObject(elements),
    };
    const value = localStorage.getItem(KEY);
    const savedProjects = value ? JSON.parse(value) : {};
    localStorage.setItem(
      KEY,
      JSON.stringify({
        ...savedProjects,
        [data.config.name]: data,
      })
    );
  }, [config, elements, relations]);
};
