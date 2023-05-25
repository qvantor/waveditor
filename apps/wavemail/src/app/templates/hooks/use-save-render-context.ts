import { useCallback } from 'react';
import {
  elementsStoreToObject,
  useBuilderContext,
} from '@waveditors/editor-model';
import { LOCAL_STORAGE_KEY } from '../constants';

export const useSaveRenderContext = () => {
  const {
    model: { config, elements, relations, variables },
  } = useBuilderContext();
  return useCallback(() => {
    const data = {
      config: config.getValue(),
      relations: relations.getValue(),
      elements: elementsStoreToObject(elements),
      variables: variables.getValue(),
    };
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedProjects = value ? JSON.parse(value) : {};
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...savedProjects,
        [data.config.rootElementId]: data,
      })
    );
  }, [config, elements, relations, variables]);
};
