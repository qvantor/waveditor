import { createGlobalStyle, StyleSheetManager } from 'styled-components';
import { Iframe } from '@waveditors/ui-kit';
import { TextEditorStyle } from '@waveditors/text-editor';
import { EDITOR_ID } from '../constants';
import { LayoutEditor as LayoutEditorInternal } from './layout-editor';

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
    -webkit-user-drag: none;
    outline: none;
  }

  a {
    cursor: default;
  }

  body {
    margin: 0;
  }
`;

interface Props {
  className?: string;
}

export const LayoutEditor = ({ className }: Props) => (
  <Iframe title='Canvas' id={EDITOR_ID} className={className}>
    {({ document }) => (
      <StyleSheetManager target={document.head}>
        <>
          <GlobalStyle />
          <TextEditorStyle />
          <LayoutEditorInternal iFrameDocument={document} />
        </>
      </StyleSheetManager>
    )}
  </Iframe>
);
