import { generateId } from '@waveditors/utils';
import { TemplateConfig } from './template-config.types';

export const createInitialTemplateConfig = (
  rootElementId: string
): TemplateConfig => {
  return {
    name: 'Untitled',
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
