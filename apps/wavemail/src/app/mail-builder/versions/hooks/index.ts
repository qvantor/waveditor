import { createContext, useCallback, useContext } from 'react';
import { EditorSnapshot } from '@waveditors/editor-model';
import { VersionsStore } from '../store';
import { useTemplateId } from '../../common/hooks';
import { useUpdateVersionMutation } from '../graphql/update-version.g';

export const VersionsContext = createContext<VersionsStore | null>(null);

export const useVersionsContext = () => {
  const context = useContext(VersionsContext);
  if (!context)
    throw new Error('useVersionsContext used out of VersionsProvider');
  return context;
};

export const useSaveSnapshot = () => {
  const templateId = useTemplateId();
  const [updateVersion] = useUpdateVersionMutation();
  return useCallback(
    async (json: EditorSnapshot) => {
      const { data } = await updateVersion({ variables: { json, templateId } });
      return data;
    },
    [templateId, updateVersion]
  );
};
