import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { GlobalStyle, theme, tokens } from '@waveditors/theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { MailBuilder } from './mail-builder';
import { TemplatesList } from './templates';
import { AUTH, BUILDER, ROOT } from './common/constants';
import { Auth, AuthRoute } from './auth';
import { client } from './common/services';

export function App() {
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
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route
                path={ROOT}
                element={
                  <AuthRoute>
                    <TemplatesList />
                  </AuthRoute>
                }
              />
              <Route path={AUTH} element={<Auth />} />
              <Route path={BUILDER} element={<MailBuilder />} />
              <Route path='*' element={<Navigate to={ROOT} />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ConfigProvider>
    </StyleProvider>
  );
}
