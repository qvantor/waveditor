import styled from 'styled-components';
import { Popover, Select, Button, Tooltip } from 'antd';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import {
  ElementStore,
  getTemplateConfigFonts,
  getTemplateConfigFontById,
  getElementFontRelationByElementId,
  selectorToPipe,
  TemplateConfigFont,
  getTemplateDefaultFont,
} from '@waveditors/editor-model';
import { useObservable } from '@waveditors/rxjs-react';
import { tokens, font } from '@waveditors/theme';
import { map, merge } from 'rxjs';
import {
  useMailBuilderContext,
  useRemoveTemplateConfigFont,
  useCreateTemplateConfigFont,
} from '../../../common/hooks';
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
  gap: 10px;
  width: 240px;
`;

const FontSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

const FontName = ({
  font,
  inherited = false,
}: {
  font: TemplateConfigFont;
  inherited?: boolean;
}) => (
  <>
    {font.main?.name && font.main?.url ? `${font.main.name}, ` : null}
    {font.fallback},{' '}
    <FamilyName>
      {font.genericFamily}
      {inherited && ', inherited'}
    </FamilyName>
  </>
);

const FontEditorRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FontEditor = ({ font }: { font: TemplateConfigFont }) => {
  const { config } = useMailBuilderContext();
  return (
    <FontEditorRoot>
      <Input
        placeholder='Font name'
        onChange={(name) =>
          config.actions.setFont({
            id: font.id,
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
            id: font.id,
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
        onChange={(value) =>
          config.actions.setFont({ id: font.id, key: 'fallback', value })
        }
        value={font.fallback}
      />
      <Select
        style={{ width: '100%' }}
        size='small'
        options={FontFamily.map((value) => ({ label: value, value }))}
        onChange={(value) =>
          config.actions.setFont({ id: font.id, key: 'genericFamily', value })
        }
        value={font.genericFamily}
      />
    </FontEditorRoot>
  );
};

export const Font = ({ element }: Props) => {
  const MaxFontsCount = 3;
  const {
    config,
    stores: { relations },
  } = useMailBuilderContext();
  const removeFont = useRemoveTemplateConfigFont();
  const createFont = useCreateTemplateConfigFont();
  const elementFont = useObservable(
    merge(relations.bs, config.bs).pipe(
      map(() =>
        getElementFontRelationByElementId(element.getValue().id)(
          relations.getValue()
        )
      ),
      map((relation) =>
        relation
          ? getTemplateConfigFontById(relation)(config.getValue()) ?? null
          : null
      )
    ),
    null,
    [element]
  );

  // @todo here should be font from closest parent
  const inheritedFont = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateDefaultFont)),
    getTemplateDefaultFont(config.getValue()),
    [config]
  );

  const fonts = useObservable(
    config.bs.pipe(selectorToPipe(getTemplateConfigFonts)),
    getTemplateConfigFonts(config.getValue()),
    [config]
  );
  const font = elementFont || inheritedFont;
  return (
    <Popover
      placement='rightBottom'
      content={
        <PopoverRoot>
          <FontSelectContainer>
            <Select
              size='small'
              value={font.id}
              options={fonts.map((font) => ({
                label: <FontName font={font} />,
                value: font.id,
              }))}
              onChange={(font) =>
                relations.actions.addElementFontRelation({
                  font,
                  element: element.getValue().id,
                })
              }
            />
            <div>
              <Tooltip title='New font (max 3)'>
                <Button
                  size='small'
                  icon={<AiOutlinePlus />}
                  disabled={fonts.length >= MaxFontsCount}
                  onClick={() => createFont(font, element.getValue().id)}
                />
              </Tooltip>
              <Tooltip title='Remove font'>
                <Button
                  size='small'
                  icon={<AiOutlineMinus />}
                  disabled={fonts.length === 1}
                  onClick={() => removeFont(font.id)}
                />
              </Tooltip>
            </div>
          </FontSelectContainer>
          <FontEditor font={font} />
        </PopoverRoot>
      }
      trigger='click'
    >
      <Root>
        <FontName font={font} inherited={!elementFont} />
      </Root>
    </Popover>
  );
};
