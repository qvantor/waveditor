import { Select } from 'antd';
import { ConfigFont } from '@waveditors/editor-model';
import styled from 'styled-components';
import { FontName } from './font-name';
import { FontEditor, FontEditorProps } from './font-editor';

type Props = {
  value: ConfigFont;
  fonts: ConfigFont[];
  onSelected: (fontId: string) => void;
  inherited: boolean;
} & Pick<FontEditorProps, 'onFontCreate' | 'onFontRemove' | 'onFontChange'>;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FontSelector = ({
  fonts,
  value,
  onSelected,
  inherited,
  ...rest
}: Props) => (
  <Root>
    <Select
      size='small'
      value={value.id}
      style={{ width: '100%' }}
      options={fonts.map((font) => ({
        label: (
          <FontName font={font} inherited={inherited && value.id === font.id} />
        ),
        value: font.id,
      }))}
      onChange={onSelected}
      allowClear={!inherited}
    />
    <FontEditor font={value} fontCount={fonts.length} {...rest} />
  </Root>
);
