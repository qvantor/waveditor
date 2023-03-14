import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { TemplateConfigFont } from '@waveditors/editor-model';
import { EmptyPattern, font, tokens } from '@waveditors/theme';
import { templateConfigFontToStyle } from '@waveditors/layout-editor';

interface Props {
  font: TemplateConfigFont;
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
      <Root style={{ fontFamily: templateConfigFontToStyle(font) }}>
        Lorem <b>Ipsum</b> <i>Dolor</i> <s>Sit</s> AMET
      </Root>
      <Helmet>
        <link key={font.id} href={font.url} rel='stylesheet' type='text/css' />
      </Helmet>
    </>
  );
};
