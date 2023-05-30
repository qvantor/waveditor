import { BehaviorSubject, Subscription } from 'rxjs';
import {
  Action,
  ActionsResult,
  Effect,
  Store,
  StoreConstructor,
} from '../types';

export const createStore = <V, A = unknown, E = unknown, S = unknown>(
  actionsHandlers: Array<A> = [],
  effectsHandlers: Array<() => E> = []
): StoreConstructor<V, A, E> => {
  const addActions = <NA extends Record<string | number, Action<V>>>(
    handlers: NA
  ) => {
    return createStore<V, A & NA, E, S>(
      [...actionsHandlers, handlers] as Array<A & NA>,
      effectsHandlers
    );
  };
  const addEffect = (effect: () => Effect<V, A>) => {
    return createStore<V, A, E, S>(actionsHandlers, [
      ...effectsHandlers,
      effect,
    ] as Array<() => E>);
  };

  const run = (initialValue: V): Store<V, A> => {
    const bs = new BehaviorSubject<V>(initialValue);
    const effects = effectsHandlers.map(
      (effectFN) => effectFN() as Effect<V, Record<keyof A, Action<V>>>
    );
    const actions = actionsHandlers.reduce((sum, fn) => {
      const actions = Object.entries(fn as Record<keyof A, unknown>).reduce(
        (sum, [key, action]) => ({
          ...sum,
          [key]: (event: never) => {
            const next = (action as Action<V, unknown>)(event, bs.value);
            const aEffects = effects.filter((effect) =>
              effect.filterActions
                ? !effect.filterActions.includes(key as keyof A)
                : true
            );
            const effectEvent = { name: key as keyof A, event, bs, next };
            const apply = aEffects.some((effect) =>
              effect.beforeAction ? !effect.beforeAction?.(effectEvent) : false
            );
            if (!apply) bs.next(next);

            aEffects.forEach((effect) =>
              effect.afterAction?.({ ...effectEvent, next: bs.value })
            );
          },
        }),
        {}
      );
      return { ...sum, ...actions };
    }, {} as ActionsResult<V, A>);
    const subscribeInternal = () =>
      effects.reduce<Subscription[]>(
        (sum, effect) => [
          ...sum,
          ...(effect.subscriptions
            ? effect.subscriptions({ bs, actions })
            : []),
        ],
        []
      );
    let subscribed = true;
    let subscriptions = subscribeInternal();
    // impure imperative function for handling subscribe/unsubscribe
    const subscribe = () => {
      if (!subscribed) {
        subscriptions = subscribeInternal();
      }
      return () => {
        subscribed = false;
        subscriptions.forEach((subscription) => subscription.unsubscribe());
      };
    };

    const getValue = () => bs.getValue();

    return { bs, actions, subscribe, getValue };
  };

  return { addActions, addEffect, run };
};
