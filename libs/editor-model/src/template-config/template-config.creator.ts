import { generateId } from '@waveditors/utils';
import { TemplateConfig } from './template-config.types';

export const createInitialTemplateConfig = (): TemplateConfig => {
  const fontId = generateId();
  return {
    name: 'Untitled',
    viewportWidth: 600,
    defaultFont: fontId,
    fonts: [
      {
        id: fontId,
        fallback: 'Helvetica',
        genericFamily: 'sans-serif',
      },
      {
        id: generateId(),
        fallback: 'Times New Roman',
        genericFamily: 'serif',
      },
    ],
  };
};
