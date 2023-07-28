import { createStore, StoreResult } from '@waveditors/rxjs-react';
import { ElementCommon } from '../elements';
import { Config, ConfigFont, FontChangedPayload } from './config.types';

export const configStoreConstructor = () =>
  createStore<Config>().addActions({
    addFont: (font: ConfigFont, state) => ({
      ...state,
      fonts: [...state.fonts, font],
    }),
    removeFont: (fontId: string, state) => ({
      ...state,
      fonts: state.fonts.filter((font) => font.id !== fontId),
    }),
    setFont: ({ id, value }: FontChangedPayload, state) => ({
      ...state,
      fonts: state.fonts.map((font) => {
        if (font.id !== id) return font;
        return value;
      }),
    }),
    setStyle: <K extends keyof ElementCommon['style']>(
      { key, value }: { key: K; value: ElementCommon['style'][K] },
      state: Config
    ) => ({
      ...state,
      style: {
        ...state.style,
        [key]: value,
      },
    }),
    setWidth: (viewportWidth: number, state) => ({ ...state, viewportWidth }),
  });

export type ConfigStore = StoreResult<typeof configStoreConstructor>;
