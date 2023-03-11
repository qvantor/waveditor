import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';
import { TemplateConfig, TemplateConfigFont } from './template-config.types';

export const templateConfigStore = () =>
  createStore<TemplateConfig>().addActions({
    setFont: <K extends keyof TemplateConfigFont>(
      { key, value }: { key: K; value: TemplateConfigFont[K] },
      state: TemplateConfig
    ) => ({
      ...state,
      fonts: [
        {
          ...state.fonts[0],
          [key]: value,
        },
      ],
    }),
  });

export type TemplateConfigStore = StoreHookResult<typeof templateConfigStore>;
export const useTemplateConfigStore = storeHookConstructor(templateConfigStore);
