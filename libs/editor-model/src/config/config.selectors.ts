import { Config } from './config.types';

export const getConfigFonts = (config: Config) => config.fonts;

export const getConfigFontById = (id: string) => (config: Config) =>
  getConfigFonts(config).find((font) => font.id === id);

export const getTemplateDefaultFont = (config: Config) => {
  const defaultFont = getConfigFonts(config)[0];
  if (!defaultFont) throw new Error('Model corrupted: no default font found');
  return defaultFont;
};

export const getConfigName = (config: Config) => config.name;
export const getConfigRootElementId = (config: Config) => config.rootElementId;

export const getConfigViewportWidth = (config: Config) => config.viewportWidth;
