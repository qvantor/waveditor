import { useCallback } from 'react';
import {
  builderContextToSnapshot,
  useBuilderContext,
} from '@waveditors/editor-model';
import { LOCAL_STORAGE_KEY } from '../constants';

export const useSaveRenderContext = () => {
  const context = useBuilderContext();
  return useCallback(() => {
    const data = builderContextToSnapshot(context);
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedProjects = value ? JSON.parse(value) : {};
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...savedProjects,
        [data.config.rootElementId]: data,
      })
    );
  }, [context]);
};
