import { Subscription } from 'rxjs';
import { useEffect } from 'react';

export const useSubscription = <D>(
  subscription: () => Subscription,
  ...deps: D[]
) => {
  useEffect(() => {
    const sb = subscription();
    return () => sb.unsubscribe();
  }, [deps]);
};
