import jwt_decode from 'jwt-decode';
import { useBsSelector } from '@waveditors/rxjs-react';
import { useMemo } from 'react';
import { User } from '@prisma/client';
import { authStore, getToken } from '../../auth';

export const useCurrentUser = () => {
  const token = useBsSelector(authStore.bs, getToken);

  return useMemo(() => (token ? jwt_decode<User>(token) : null), [token]);
};
