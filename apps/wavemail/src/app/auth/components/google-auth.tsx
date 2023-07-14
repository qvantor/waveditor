import { RefObject, useEffect, useRef } from 'react';
import {
  fromEvent,
  switchMap,
  map,
  of,
  filter,
  forkJoin,
  Observable,
  take,
} from 'rxjs';
import { unsubscribeAll } from '@waveditors/rxjs-react';
import { useGoogleAuthMutation } from '../graphql/google-auth.g';
import { AuthSuccess } from '../../common/types/gql.g';
import { NX_GOOGLE_OAUTH_CLIENT } from '../../common/constants';

const renderButton = (account: typeof google.accounts, element: HTMLElement) =>
  account.id.renderButton(element, {
    theme: 'outline',
    type: 'standard',
    text: 'continue_with',
    width: '300',
  });

const onAuth = (account: typeof google.accounts) =>
  new Observable<google.accounts.id.CredentialResponse>((observer) => {
    account.id.initialize({
      client_id: NX_GOOGLE_OAUTH_CLIENT,
      callback: (payload) => {
        observer.next(payload);
        observer.complete();
      },
    });
  });

interface Props {
  onSuccess: (result: AuthSuccess) => void;
}

const useGsiScript = (
  ref: RefObject<HTMLElement>,
  onSuccess: Props['onSuccess']
) => {
  const [googleAuth] = useGoogleAuthMutation();
  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://accounts.google.com/gsi/client';
    scriptTag.async = true;
    scriptTag.defer = true;

    const account = fromEvent(scriptTag, 'load').pipe(
      map(() => google.accounts ?? null),
      filter(Boolean),
      take(1)
    );
    const element = of(ref.current).pipe(filter(Boolean));
    // after getting google credentials, auth user
    const token = account
      .pipe(
        switchMap(onAuth),
        switchMap(({ credential }) =>
          googleAuth({ variables: { auth: { credentials: credential } } })
        ),
        map((value) => value.data?.googleAuth),
        filter(Boolean)
      )
      .subscribe(onSuccess);

    // render google button
    const button = forkJoin([account, element]).subscribe((value) =>
      renderButton(...value)
    );

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
      unsubscribeAll([button, token]);
    };
  }, [ref, onSuccess, googleAuth]);
};

export const GoogleAuth = ({ onSuccess }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  useGsiScript(container, onSuccess);
  return <div ref={container} />;
};
