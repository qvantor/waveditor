import { CommonUndoEvent } from '@waveditors/rxjs-react';
import { Style } from '../types';

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
  url?: string;
  name?: string;
  fallback: FallbackFonts;
  genericFamily: GenericFontFamily;
};

export type TemplateConfig = {
  name: string;
  rootElementId: string;
  viewportWidth: number;
  fonts: TemplateConfigFont[];
  style: Style;
};

export type FontChangedPayload = { id: string; value: TemplateConfigFont };

export type TemplateStoreUndoRedoEvent = CommonUndoEvent<
  'TemplateStore',
  TemplateConfig
>;
