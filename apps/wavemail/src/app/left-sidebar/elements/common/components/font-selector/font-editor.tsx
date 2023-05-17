import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Select, Tooltip } from 'antd';
import { deepEqual } from 'fast-equals';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSave } from 'react-icons/ai';
import {
  TemplateConfigFont,
  FontChangedPayload,
} from '@waveditors/editor-model';
import { removeKey } from '@waveditors/utils';
import { Input } from '../../../../../common/components';
import { FontPreview } from './font-preview';

const FallbackFonts = [
  'Arial',
  'Courier New',
  'Georgia',
  'Helvetica',
  'Lucida Sans',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
];
const FontFamily = [
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'math',
];

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FontEditorActions = styled.div`
  display: flex;
  gap: 5px;
  justify-content: end;

  button {
    line-height: 26px;
  }
`;

export interface FontEditorProps {
  font: TemplateConfigFont;
  fontCount: number;
  onFontCreate: (font: TemplateConfigFont) => void;
  onFontRemove: (fontId: string) => void;
  onFontChange: (change: FontChangedPayload) => void;
}

export const FontEditor = ({
  font,
  fontCount,
  onFontCreate,
  onFontRemove,
  onFontChange,
}: FontEditorProps) => {
  const MaxFontsCount = 3;
  const [fontEditorState, setFontEditorState] =
    useState<TemplateConfigFont>(font);

  const setFontNameOrUrl = useCallback(
    (key: 'name' | 'url') => (value?: string) =>
      setFontEditorState(
        !value || value === ''
          ? removeKey(fontEditorState, key)
          : { ...fontEditorState, [key]: value }
      ),
    [fontEditorState]
  );
  useEffect(() => setFontEditorState(font), [font]);

  return (
    <Root>
      <FontPreview font={fontEditorState} />
      <Input
        placeholder='Font name'
        onChange={setFontNameOrUrl('name')}
        value={fontEditorState?.name}
        autoFocus
      />
      <Input
        placeholder='Font style link'
        onChange={setFontNameOrUrl('url')}
        value={fontEditorState?.url}
      />
      <Select
        style={{ width: '100%' }}
        size='small'
        options={FallbackFonts.map((value) => ({ label: value, value }))}
        onChange={(fallback) =>
          setFontEditorState({ ...fontEditorState, fallback })
        }
        value={fontEditorState.fallback}
      />
      <Select
        style={{ width: '100%' }}
        size='small'
        options={FontFamily.map((value) => ({ label: value, value }))}
        onChange={(genericFamily) =>
          setFontEditorState({ ...fontEditorState, genericFamily })
        }
        value={fontEditorState.genericFamily}
      />
      <FontEditorActions>
        <Tooltip title='Remove font'>
          <Button
            size='small'
            icon={<AiOutlineMinus />}
            disabled={fontCount === 1}
            onClick={() => onFontRemove(font.id)}
          />
        </Tooltip>
        <Tooltip title='New font'>
          <Button
            size='small'
            icon={<AiOutlinePlus />}
            disabled={fontCount >= MaxFontsCount}
            onClick={() => onFontCreate(fontEditorState)}
          />
        </Tooltip>
        <Tooltip title='Save font'>
          <Button
            size='small'
            icon={<AiOutlineSave />}
            disabled={deepEqual(font, fontEditorState)}
            onClick={() =>
              onFontChange({ id: font.id, value: fontEditorState })
            }
          />
        </Tooltip>
      </FontEditorActions>
    </Root>
  );
};
