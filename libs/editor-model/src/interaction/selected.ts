import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';

export const selectedStore = () =>
  createStore<string | null>().addActions({
    setSelected: (id: string) => id,
    unselect: () => null,
  });

export const useSelectedStore = storeHookConstructor(selectedStore);
export type SelectedStore = StoreHookResult<typeof selectedStore>;
