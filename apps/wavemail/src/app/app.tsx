import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { GlobalStyle, theme, tokens } from '@waveditors/theme';
import { useBehaviorSubject } from '@waveditors/rxjs-react';
import { MailBuilder } from './mail-builder';
import { RenderContextStore } from './templates';

export function App() {
  const renderContextObject = useBehaviorSubject(RenderContextStore.bs);
  return (
    <StyleProvider container={document.head}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.color.surface.accent,
            colorBorder: tokens.color.border.primary,
            colorFillQuaternary: tokens.color.surface.quaternary,
            borderRadiusLG: 0,
            paddingContentVerticalSM: 5,
            paddingContentHorizontalSM: 8,
            paddingSM: 8,
            paddingXS: 5,
            fontFamily: tokens.font.family,
          },
        }}
      >
        <GlobalStyle />
        <MailBuilder {...renderContextObject} />
      </ConfigProvider>
    </StyleProvider>
  );
}
