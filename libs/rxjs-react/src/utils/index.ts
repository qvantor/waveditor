import { Subscription } from 'rxjs';

export const unsubscribeAll = (subs: Subscription[]) =>
  subs.forEach((sb) => sb.unsubscribe());
