import { BehaviorSubject, debounceTime, tap, Subject } from 'rxjs';

// module with effect to connect to different stores
// and collect their changes with some delay
export const onChangeDebounceModule = (delaySec = 5) => {
  const changed = new BehaviorSubject(true);
  const storeChangeInternal = new Subject();
  const effect = () => ({
    subscriptions: ({ bs }: { bs: BehaviorSubject<any> }) => [
      bs.subscribe(storeChangeInternal),
    ],
  });
  const subscribe = (fn: () => void) => {
    const sb = storeChangeInternal
      .pipe(
        tap(() => changed.next(false)),
        debounceTime(delaySec * 1000),
        tap(() => changed.next(true))
      )
      .subscribe(fn);
    return () => sb.unsubscribe();
  };

  return { effect, subscribe, changed };
};

export type OnChangeDebounceModule = ReturnType<typeof onChangeDebounceModule>;
