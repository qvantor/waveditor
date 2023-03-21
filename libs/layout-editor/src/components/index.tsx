import { createGlobalStyle } from 'styled-components';
import { Context } from '../types';
import { Iframe } from '../iframe';
import { LayoutEditor as LayoutEditorInternal } from './layout-editor';

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
    outline: none;
  }

  body {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
`;

export const LayoutEditor = (
  props: Omit<Context, 'internalEvents' | 'internalState'>
) => (
  <Iframe title='Canvas'>
    <>
      <GlobalStyle />
      <LayoutEditorInternal {...props} />
    </>
  </Iframe>
);
