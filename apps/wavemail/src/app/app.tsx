import { ConfigProvider } from 'antd';
import { GlobalStyle, tokens, theme } from '@waveditors/theme';
import { MailBuilder } from './common/components';

export function App() {
  return (
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
      <MailBuilder />
    </ConfigProvider>
  );
}
