import {
  createStore,
  StoreHookResult,
  UndoRedoModule,
} from '@waveditors/rxjs-react';
import { UndoRedoEvents } from '../types';
import {
  FontChangedPayload,
  TemplateConfig,
  TemplateConfigFont,
} from './template-config.types';

export const templateConfigStoreConstructor = ({
  undoRedo: { createUndoRedoEffect },
}: {
  undoRedo: UndoRedoModule<UndoRedoEvents>;
}) =>
  createStore<TemplateConfig>()
    .addActions({
      setName: (name: string, state) => ({ ...state, name }),
      addFont: (font: TemplateConfigFont, state) => ({
        ...state,
        fonts: [...state.fonts, font],
      }),
      removeFont: (fontId: string, state) => ({
        ...state,
        fonts: state.fonts.filter((font) => font.id !== fontId),
      }),
      setFont: ({ id, value }: FontChangedPayload, state: TemplateConfig) => ({
        ...state,
        fonts: state.fonts.map((font) => {
          if (font.id !== id) return font;
          return value;
        }),
      }),
    })
    .addEffect(createUndoRedoEffect('TemplateStore'));

export type TemplateConfigStore = StoreHookResult<
  typeof templateConfigStoreConstructor
>;
