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

export type ConfigFont = {
  id: string;
  url?: string;
  name?: string;
  fallback: FallbackFonts;
  genericFamily: GenericFontFamily;
};

export type Config = {
  rootElementId: string;
  viewportWidth: number;
  fonts: ConfigFont[];
  style: Style;
};

export type FontChangedPayload = { id: string; value: ConfigFont };

export type ConfigStoreUndoRedoEvent = CommonUndoEvent<'ConfigStore', Config>;
