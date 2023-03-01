import {
  createStore,
  storeHookConstructor,
  StoreHookResult,
} from '@waveditors/rxjs-react';

const r = createStore()
  .addActions({
    hello: (name: string, prevState) => `${name} ${prevState}`,
    test: (test: { id: string }) => test.id,
    // hello2: () => 13,
  })
  .addActions({
    init: () => '32',
  })
  .addEffect(() => ({
    filterActions: ['hello'],
    // beforeAction: () => false,
  }))
  .addEffect(() => {
    return {
      filterActions: ['hello'],
      beforeAction: ({ event, next, name }) => {
        // console.log('beforeAction', event, result, name);
        return true;
      },
      afterAction: ({ event, next, name }) => {
        // console.log('afterAction', result);
      },
      subscriptions: () => {
        return [];
      },
    };
  })
  .run('32');
r.actions.test({ id: 'sa' });
r.actions.hello('hello is added to');
r.actions.init();

// r.actions.shit()
// r.actions.hello(13)

export const hoverStore = () =>
  createStore<string | null>().addActions({
    addHover: (id: string) => id,
    removeHover: () => null,
  });

export const useHoverStore = storeHookConstructor(hoverStore);
export type HoverStore = StoreHookResult<typeof hoverStore>;
