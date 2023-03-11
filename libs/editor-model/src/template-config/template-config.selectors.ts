import { TemplateConfig } from './template-config.types';

export const getTemplateConfigFonts = (config: TemplateConfig) => config.fonts;

export const getTemplateConfigFontById =
  (id: string) => (config: TemplateConfig) =>
    getTemplateConfigFonts(config).find((font) => font.id === id);

export const getTemplateDefaultFont = (config: TemplateConfig) => {
  const defaultFont = getTemplateConfigFonts(config)[0];
  if (!defaultFont) throw new Error('Model corrupted: no default font found');
  return defaultFont;
};
