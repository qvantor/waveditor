import { createStore, StoreResult } from '@waveditors/rxjs-react';
import { Config, ConfigFont, FontChangedPayload } from './config.types';

export const configStoreConstructor = () =>
  createStore<Config>().addActions({
    setName: (name: string, state) => ({ ...state, name }),
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
  });

export type ConfigStore = StoreResult<typeof configStoreConstructor>;
