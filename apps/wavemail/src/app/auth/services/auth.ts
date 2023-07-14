import { createStore } from '@waveditors/rxjs-react';
import { tryCatch } from '@waveditors/utils';
import { skip } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthSuccess, User } from '../../common/types/gql.g';

const STORAGE_KEY = 'auth';
const MIN_SEC_TILL_EXPIRE = 60;

type AuthStore = AuthSuccess | null;
export const getToken = (store: AuthStore) => store?.accessToken;
export const isAuthenticated = (store: AuthStore) => {
  if (!store) return false;
  const secTillExpire = Math.round(store.expires - new Date().getTime() / 1000);
  return secTillExpire > MIN_SEC_TILL_EXPIRE;
};

export const getUserFromToken = <
  T extends AuthStore,
  R = T extends null ? null : User
>(
  store: T
): R => (store === null ? null : jwt_decode<User>(store.accessToken)) as R;

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem(STORAGE_KEY);
  if (!storage) return null;
  const [err, data] = tryCatch(JSON.parse)(storage);
  if (err || !data) return null;
  if (!('accessToken' in data && 'expires' in data)) return null;
  return data as AuthSuccess;
};

const authStoreConstructor = () =>
  createStore<AuthStore>()
    .addActions({
      set: (auth: AuthSuccess) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
        return auth;
      },
      logout: () => null,
    })
    .addEffect(() => ({
      // sync store with localstorage
      subscriptions: ({ bs }) => [
        bs.pipe(skip(1)).subscribe((auth) => {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
        }),
      ],
    }))
    .run(getStateFromLocalStorage());

export const authStore = authStoreConstructor();
