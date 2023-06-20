import { BehaviorSubject, debounceTime, skip, Subject } from 'rxjs';

// module with effect to connect to different stores
// and collect their changes with some delay
export const onChangeDebounceModule = (delaySec = 5) => {
  const storeChangeInternal = new Subject();
  const effect = () => ({
    subscriptions: ({ bs }: { bs: BehaviorSubject<any> }) => [
      bs.subscribe(storeChangeInternal),
    ],
  });
  const subscribe = (fn: () => void) => {
    const sb = storeChangeInternal
      .pipe(debounceTime(delaySec * 1000), skip(1))
      .subscribe(fn);
    return () => sb.unsubscribe();
  };

  return { effect, subscribe };
};

export type OnChangeDebounceModule = ReturnType<typeof onChangeDebounceModule>;
