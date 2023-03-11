import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';
import { TemplateConfig, TemplateConfigFont } from './template-config.types';

export const templateConfigStore = () =>
  createStore<TemplateConfig>().addActions({
    addFont: (font: TemplateConfigFont, state) => ({
      ...state,
      fonts: [...state.fonts, font],
    }),
    removeFont: (fontId: string, state) => ({
      ...state,
      fonts: state.fonts.filter((font) => font.id !== fontId),
    }),
    setFont: <K extends keyof TemplateConfigFont>(
      { id, key, value }: { id: string; key: K; value: TemplateConfigFont[K] },
      state: TemplateConfig
    ) => ({
      ...state,
      fonts: state.fonts.map((font) => {
        if (font.id !== id) return font;
        return { ...font, [key]: value };
      }),
    }),
  });

export type TemplateConfigStore = StoreHookResult<typeof templateConfigStore>;
export const useTemplateConfigStore = storeHookConstructor(templateConfigStore);
