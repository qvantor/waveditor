import { createStore, StoreResult } from '@waveditors/rxjs-react';

export const selectedStoreConstructor = () =>
  createStore<string | null>().addActions({
    setSelected: (id: string) => id,
    unselect: () => null,
  });

export type SelectedStore = StoreResult<typeof selectedStoreConstructor>;
