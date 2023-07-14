import { EditorSnapshot } from '@waveditors/editor-model';
import { createStore, StoreHookResult } from '@waveditors/rxjs-react';

type Preview = { id: number; snapshot: EditorSnapshot; name: string };

export type Versions = {
  current: EditorSnapshot | null;
  preview: Preview | null;
};
export const getCurrent = (versions: Versions) => versions.current;
export const getPreview = (versions: Versions) => versions.preview;

export const versionsStoreConstructor = () =>
  createStore<Versions>().addActions({
    setCurrent: (current: EditorSnapshot, prev) => ({ ...prev, current }),
    setPreview: (preview: Preview, prev) => ({ ...prev, preview }),
    cleanPreview: (_, prev) => ({ ...prev, preview: null }),
  });

export type VersionsStore = StoreHookResult<typeof versionsStoreConstructor>;
