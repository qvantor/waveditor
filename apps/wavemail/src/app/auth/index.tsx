import styled from 'styled-components';
import { font, tokens } from '@waveditors/theme';
import { Button } from 'antd';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectorToPipe, useSubscription } from '@waveditors/rxjs-react';
import { Input } from '../common/components';
import { ROOT } from '../common/constants';
import { GoogleAuth, AuthRoute } from './components';
import { authStore, isAuthenticated, getToken } from './services';

export { AuthRoute };

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${tokens.color.surface.primary};
  background-image: radial-gradient(
    #a8b0b5 0.5px,
    ${tokens.color.surface.primary} 0.5px
  );
  background-size: 10px 10px;
  height: calc(
    100vh - ${tokens.size.headerHeight} - ${tokens.size.footerHeight}
  );
`;

const Form = styled.div`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${tokens.color.surface.secondary};
  padding: 20px 30px;
  border-radius: ${tokens.borderRadius.l};
`;

const Header = styled.div`
  ${font({ type: 'header', weight: 'medium', size: 'small' })};
  margin-bottom: 10px;
`;

const Separator = styled.div`
  position: relative;
  text-align: center;
  margin: 10px 0;

  ${font({ size: 'small', weight: 'light' })}
  &:before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background: ${tokens.color.border.primary};
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }

  span {
    position: relative;
    background: ${tokens.color.surface.secondary};
    padding: 0 10px;
  }
`;

export { authStore, getToken };

export const Auth = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useSubscription(() =>
    authStore.bs
      .pipe(selectorToPipe(isAuthenticated))
      .subscribe((authenticated) => {
        if (authenticated) navigate(state?.path ?? ROOT);
      })
  );
  return (
    <Root>
      <Form>
        <Header>You need Sign in to join</Header>
        <GoogleAuth onSuccess={authStore.actions.set} />
        <Separator>
          <span>or</span>
        </Separator>
        <Input placeholder='Email' size='middle' prefix={<AiOutlineUser />} />
        <Input
          placeholder='Password'
          size='middle'
          prefix={<AiOutlineLock />}
        />
        <Button type='primary'>Sign in</Button>
      </Form>
    </Root>
  );
};
