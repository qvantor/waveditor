import styled from 'styled-components';
import { ConfigFont } from '@waveditors/editor-model';
import { EmptyPattern, font, tokens } from '@waveditors/theme';
import { configFontToStyle, Helmet } from '@waveditors/layout-render';

interface Props {
  font: ConfigFont;
}

const Root = styled.div`
  height: 32px;
  line-height: 32px;
  text-align: center;
  user-select: none;
  ${font({ size: 'large' })};
  ${EmptyPattern};
  border-radius: ${tokens.borderRadius.m};
`;

export const FontPreview = ({ font }: Props) => {
  return (
    <>
      <Root style={{ fontFamily: configFontToStyle(font) }}>
        Lorem <b>Ipsum</b> <i>Dolor</i> <s>Sit</s> AMET
      </Root>
      <Helmet>
        <link key={font.id} href={font.url} rel='stylesheet' type='text/css' />
      </Helmet>
    </>
  );
};
