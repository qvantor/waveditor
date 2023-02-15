import { BehaviorSubject, Subscription, Unsubscribable } from 'rxjs';

export type ActionsResult<V, A> = {
  [K in keyof A]: A[K] extends Action<V>
    ? Parameters<A[K]>[0] extends undefined
      ? () => V
      : (event: Parameters<A[K]>[0]) => V
    : never;
};

export type EffectAction<V, N, E> = {
  name: N;
  event: E;
  next: V;
  bs: BehaviorSubject<V>;
};

export interface Effect<
  V,
  A,
  N = keyof A,
  E = A[keyof A] extends Action<V> ? Parameters<A[keyof A]>[0] : never
> {
  actions?: N[];
  beforeAction?: (action: EffectAction<V, N, E>) => boolean;
  afterAction?: (action: EffectAction<V, N, E>) => void;
  subscriptions?: (config: {
    bs: BehaviorSubject<V>;
    actions: ActionsResult<V, A>;
  }) => Subscription[];
}

export type Action<V, AV = never> = (value: AV, state: V) => V;

export interface Store<V, A> extends Unsubscribable {
  bs: BehaviorSubject<V>;
  actions: ActionsResult<V, A>;
  getValue: () => V;
}

export interface StoreConstructor<V, A, E> {
  addActions: <NA extends Record<string | number, Action<V>>>(
    handlers: NA
  ) => StoreConstructor<V, A & NA, E>;
  addEffect: (
    effect: (context?: { bs: BehaviorSubject<V> }) => Effect<V, A>
  ) => StoreConstructor<V, A, E>;
  run: (initialValue: V) => Store<V, A>;
}

export type AnyStoreConstructor = (
  deps: any
) => StoreConstructor<any, any, any>;

export type StoreResult<C extends AnyStoreConstructor> = ReturnType<
  ReturnType<C>['run']
>;

export type StoreHookResult<C extends AnyStoreConstructor> = Omit<
  StoreResult<C>,
  'unsubscribe'
>;
