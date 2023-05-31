import styled, {
  createGlobalStyle,
  StyleSheetManager,
} from 'styled-components';
import { Iframe } from '@waveditors/ui-kit';
import { tokens } from '@waveditors/theme';
import { TextEditorStyle } from '@waveditors/text-editor';
import { EDITOR_ID } from '../constants';
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

export const LayoutEditor = () => (
  <Root title='Canvas' id={EDITOR_ID}>
    {({ document }) => (
      <StyleSheetManager target={document.head}>
        <>
          <GlobalStyle />
          <TextEditorStyle />
          <LayoutEditorInternal iFrameDocument={document} />
        </>
      </StyleSheetManager>
    )}
  </Root>
);
