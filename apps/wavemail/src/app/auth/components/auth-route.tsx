import { useNavigate, useLocation } from 'react-router-dom';
import { selectorToPipe, useSubscription } from '@waveditors/rxjs-react';
import { PropsWithChildren } from 'react';
import { authStore, isAuthenticated } from '../services';
import { AUTH } from '../../common/constants';

export const AuthRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  useSubscription(() =>
    authStore.bs.pipe(selectorToPipe(isAuthenticated)).subscribe((auth) => {
      if (auth) return;
      navigate(AUTH, { state: { path: location.pathname } });
    })
  );
  return <>{children}</>;
};
