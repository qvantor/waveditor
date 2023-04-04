import styled, {
  createGlobalStyle,
  StyleSheetManager,
} from 'styled-components';
import { Iframe } from '@waveditors/ui-kit';
import { tokens } from '@waveditors/theme';
import { RenderContext } from '@waveditors/layout-render';
import { Context } from '../types';
import { LayoutEditor as LayoutEditorInternal } from './layout-editor';

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
    outline: none;
  }

  body {
    margin: 0;
  }
`;
const Root = styled(Iframe)`
  height: calc(
    100vh - ${tokens.size.headerHeight} - ${tokens.size.footerHeight}
  );
`;

export const LayoutEditor = (
  props: Omit<Context, 'internalEvents' | 'internalState' | 'iFrameDocument'> &
    RenderContext
) => {
  return (
    <Root title='Canvas'>
      {({ document }) => (
        <StyleSheetManager target={document.head}>
          <>
            <GlobalStyle />
            <LayoutEditorInternal {...props} iFrameDocument={document} />
          </>
        </StyleSheetManager>
      )}
    </Root>
  );
};
