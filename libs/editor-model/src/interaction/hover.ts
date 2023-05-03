import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';

export const hoverStore = () =>
  createStore<string | null>().addActions({
    addHover: (id: string) => id,
    removeHover: () => null,
  });

export const useHoverStore = storeHookConstructor(hoverStore);
export type HoverStore = StoreHookResult<typeof hoverStore>;
