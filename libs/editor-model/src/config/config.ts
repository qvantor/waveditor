import {
  createStore,
  StoreHookResult,
  UndoRedoModule,
} from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../types';
import { Config, ConfigFont, FontChangedPayload } from './config.types';

export const configStoreConstructor = ({
  undoRedo: { createUndoRedoEffect },
}: {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
}) =>
  createStore<Config>()
    .addActions({
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
    })
    .addEffect(createUndoRedoEffect('ConfigStore'));

export type ConfigStore = StoreHookResult<typeof configStoreConstructor>;
