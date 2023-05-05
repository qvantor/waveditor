import { createStore } from '@waveditors/rxjs-react';
import { ElementCommon, ElementLink } from './element.types';

export const elementStore = <T extends ElementCommon>() =>
  createStore<T>().addActions({
    setStyle: <K extends keyof ElementCommon['style']>(
      { key, value }: { key: K; value: ElementCommon['style'][K] },
      state: T
    ) => ({
      ...state,
      style: {
        ...state.style,
        [key]: value,
      },
    }),
    setLink: (link: ElementLink | null, state) => ({ ...state, link }),
    setName: (name: string, state) => ({ ...state, name }),
  });
