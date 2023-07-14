import { useNavigate, useLocation } from 'react-router-dom';
import { useSubscription } from '@waveditors/rxjs-react';
import { PropsWithChildren } from 'react';
import { map } from 'rxjs';
import { authStore, isAuthenticated, getUserFromToken } from '../services';
import { AUTH, CONTROL_PANEL } from '../../common/constants';
import { Role } from '../../common/types/gql.g';

interface Props {
  roles?: Role[];
}

export const AuthRoute = ({ children, roles }: PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  const location = useLocation();
  useSubscription(() =>
    authStore.bs
      .pipe(
        map((value) => {
          if (!value || !isAuthenticated(value))
            return { auth: false, user: null } as const;
          return {
            auth: true,
            user: getUserFromToken(value),
          } as const;
        })
      )
      .subscribe((payload) => {
        if (payload.auth) {
          if (!roles) return;
          if (roles.includes(payload.user.role)) return;
          return navigate(CONTROL_PANEL);
        }
        navigate(AUTH, { state: { path: location.pathname } });
      })
  );
  return <>{children}</>;
};
