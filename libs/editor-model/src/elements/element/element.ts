import { createStore } from '@waveditors/rxjs-react';
import { ElementCommon } from './element.types';

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
    setFontId: (fontId: string, state) => ({ ...state, fontId }),
  });
