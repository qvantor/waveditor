import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { GlobalStyle, theme, tokens } from '@waveditors/theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { lazy, Suspense } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { AUTH, BUILDER, CONTROL_PANEL } from './common/constants';
import { AuthRoute } from './auth';
import { client } from './common/services';

const Auth = lazy(() => import('./auth'));
const ControlPanel = lazy(() => import('./control-panel'));
const MailBuilder = lazy(() => import('./mail-builder'));

dayjs.extend(relativeTime);

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
            <Suspense>
              <Routes>
                <Route path={`${CONTROL_PANEL}/*`} element={<ControlPanel />} />
                <Route path={AUTH} element={<Auth />} />
                <Route
                  path={BUILDER}
                  element={
                    <AuthRoute>
                      <MailBuilder />
                    </AuthRoute>
                  }
                />
                <Route path='*' element={<Navigate to={CONTROL_PANEL} />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ApolloProvider>
      </ConfigProvider>
    </StyleProvider>
  );
}
