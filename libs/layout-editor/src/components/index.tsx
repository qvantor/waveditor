import styled, {
  createGlobalStyle,
  StyleSheetManager,
} from 'styled-components';
import { Iframe } from '@waveditors/ui-kit';
import { tokens } from '@waveditors/theme';
import { RenderContext, RenderContextValue } from '@waveditors/layout-render';
import { TextEditorStyle } from '@waveditors/text-editor';
import { Context } from '../types';
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

export const LayoutEditor = (
  props: Omit<Context, 'internalEvents' | 'internalState' | 'iFrameDocument'> &
    RenderContext
) => (
  <Root title='Canvas' id={EDITOR_ID}>
    {({ document }) => (
      <StyleSheetManager target={document.head}>
        <RenderContextValue.Provider
          value={{
            config: props.config,
            elements: props.elements,
            relations: props.relations,
          }}
        >
          <GlobalStyle />
          <TextEditorStyle />
          <LayoutEditorInternal {...props} iFrameDocument={document} />
        </RenderContextValue.Provider>
      </StyleSheetManager>
    )}
  </Root>
);
