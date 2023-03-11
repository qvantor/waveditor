export type FallbackFonts =
  | 'Arial'
  | 'Courier New'
  | 'Georgia'
  | 'Helvetica'
  | 'Lucida Sans'
  | 'Tahoma'
  | 'Times New Roman'
  | 'Trebuchet MS';

export type GenericFontFamily =
  | 'serif'
  | 'sans-serif'
  | 'monospace'
  | 'cursive'
  | 'fantasy'
  | 'math';

export type TemplateConfigFont = {
  id: string;
  main?: {
    url?: string;
    name?: string;
  };
  fallback: FallbackFonts;
  genericFamily: GenericFontFamily;
};

export type TemplateConfig = {
  name: string;
  viewportWidth: number;
  defaultFont: string;
  fonts: TemplateConfigFont[];
};
