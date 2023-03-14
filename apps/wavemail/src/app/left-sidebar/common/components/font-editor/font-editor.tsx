import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Select, Tooltip } from 'antd';
import { deepEqual } from 'fast-equals';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineSave } from 'react-icons/ai';
import { TemplateConfigFont } from '@waveditors/editor-model';
import { removeKey } from '@waveditors/utils';
import { Input } from '../../../../common/components';
import {
  useCreateTemplateConfigFont,
  useMailBuilderContext,
  useRemoveTemplateConfigFont,
} from '../../../../common/hooks';
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
`;

interface Props {
  elementId: string;
  font: TemplateConfigFont;
  fontCount: number;
}

export const FontEditor = ({ elementId, font, fontCount }: Props) => {
  const MaxFontsCount = 3;
  const { config } = useMailBuilderContext();
  const removeFont = useRemoveTemplateConfigFont();
  const createFont = useCreateTemplateConfigFont();
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
        <Tooltip title='Save font'>
          <Button
            size='small'
            icon={<AiOutlineSave />}
            disabled={deepEqual(font, fontEditorState)}
            onClick={() =>
              config.actions.setFont({ id: font.id, value: fontEditorState })
            }
          />
        </Tooltip>
        <Tooltip title='New font'>
          <Button
            size='small'
            icon={<AiOutlinePlus />}
            disabled={fontCount >= MaxFontsCount}
            onClick={() => createFont(font, elementId)}
          />
        </Tooltip>
        <Tooltip title='Remove font'>
          <Button
            size='small'
            icon={<AiOutlineMinus />}
            disabled={fontCount === 1}
            onClick={() => removeFont(font.id)}
          />
        </Tooltip>
      </FontEditorActions>
    </Root>
  );
};
