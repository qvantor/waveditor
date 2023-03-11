import styled from 'styled-components';
import { Popover, Select } from 'antd';
import {
  ElementStore,
  getTemplateConfigFonts,
  getTemplateConfigFontById,
  selectorToPipe,
  TemplateConfigFont,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { tokens, font } from '@waveditors/theme';
import { map, merge } from 'rxjs';
import { useMailBuilderContext } from '../../../common/hooks';
import { Input } from '../../../common/components';

const Root = styled.div`
  height: 22px;
  border: 1px solid ${tokens.color.border.primary};
  border-radius: ${tokens.borderRadius.m};
  padding: 0 4px;
  ${font({ size: 'small' })}
`;

const PopoverRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 200px;
`;

const FamilyName = styled.span`
  color: ${tokens.color.text.secondary};
`;

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

interface Props {
  element: ElementStore;
}

const FontName = ({ font }: { font: TemplateConfigFont }) => (
  <>
    {font.main?.name && font.main?.url ? `${font.main.name}, ` : null}
    {font.fallback}, <FamilyName>{font.genericFamily}</FamilyName>
  </>
);

const FontEditor = ({ fontId }: { fontId: string }) => {
  const { config } = useMailBuilderContext();
  const font = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateConfigFontById(fontId))),
    getTemplateConfigFontById(fontId)(config.getValue())
  );
  if (!font) return null;
  return (
    <div>
      <Input
        placeholder='Font name'
        onChange={(name) =>
          config.actions.setFont({
            key: 'main',
            value: { url: font.main?.url, name },
          })
        }
        value={font.main?.name}
      />
      <Input
        placeholder='Font style link'
        onChange={(url) =>
          config.actions.setFont({
            key: 'main',
            value: { url, name: font.main?.name },
          })
        }
        value={font.main?.url}
      />
      <Select
        style={{ width: '100%' }}
        size='small'
        options={FallbackFonts.map((value) => ({ label: value, value }))}
        onChange={(value) => config.actions.setFont({ key: 'fallback', value })}
        value={font.fallback}
      />
      <Select
        style={{ width: '100%' }}
        size='small'
        options={FontFamily.map((value) => ({ label: value, value }))}
        onChange={(value) =>
          config.actions.setFont({ key: 'genericFamily', value })
        }
        value={font.genericFamily}
      />
    </div>
  );
};

export const Font = ({ element }: Props) => {
  const { config } = useMailBuilderContext();
  const font = useObservable(
    merge(config.bs, element.bs).pipe(
      map(() => element.getValue().fontId ?? config.getValue().defaultFont),
      map((fontId) => getTemplateConfigFontById(fontId)(config.getValue()))
    ),
    undefined
  );
  const fonts = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateConfigFonts)),
    getTemplateConfigFonts(config.getValue()),
    [config]
  );
  if (!font) return null;
  return (
    <Popover
      placement='rightBottom'
      content={
        <PopoverRoot>
          <Select
            size='small'
            value={font.id}
            options={fonts.map((font) => ({
              label: <FontName font={font} />,
              value: font.id,
            }))}
            onChange={element.actions.setFontId}
          />
          <FontEditor fontId={font.id} />
        </PopoverRoot>
      }
      trigger='click'
    >
      <Root>
        <FontName font={font} />
      </Root>
    </Popover>
  );
};
