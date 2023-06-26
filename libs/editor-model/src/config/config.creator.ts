import { generateId } from '@waveditors/utils';
import { Config, ConfigFont } from './config.types';

export const createInitialConfig = (rootElementId: string): Config => {
  return {
    rootElementId,
    viewportWidth: 600,
    style: {
      margin: '0',
      backgroundColor: '#f3f3f5',
      fontSize: '16px',
    },
    fonts: [
      {
        id: generateId(),
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

export const createConfigFont = (font: Partial<ConfigFont>): ConfigFont => ({
  id: generateId(),
  fallback: 'Helvetica',
  genericFamily: 'sans-serif',
  ...font,
});
