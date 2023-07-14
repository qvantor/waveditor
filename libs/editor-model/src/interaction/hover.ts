import { createStore, StoreResult } from '@waveditors/rxjs-react';

export const hoverStoreConstructor = () =>
  createStore<string | null>().addActions({
    addHover: (id: string) => id,
    removeHover: () => null,
  });

export type HoverStore = StoreResult<typeof hoverStoreConstructor>;
