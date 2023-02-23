import { ConfigProvider } from 'antd';
import { GlobalStyle, tokens } from '@waveditors/theme';
import { MailBuilder } from './common/components';

export function App() {
  return (
    <ConfigProvider
      theme={{ token: { colorBorder: tokens.color.border.primary } }}
    >
      <GlobalStyle />
      <MailBuilder />
    </ConfigProvider>
  );
}

export default App;
