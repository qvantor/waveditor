import { renderHook } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { storeHookConstructor, createStore } from './';

type SimpleStore = { name: string; age: number };
const simpleInitial = () => {
  const initialData: SimpleStore = { name: 'Ivan', age: 32 };
  const actionName = 'rename';
  const actionName2 = 'rename2';
  const simpleStore = <T extends string>(name: T) =>
    createStore<SimpleStore>().addActions({
      [name]: (name: string, state) => ({ ...state, name }),
    });
  const useSimpleStore = storeHookConstructor(simpleStore);

  return {
    simpleStore,
    useSimpleStore,
    initialData,
    actionName,
    actionName2,
  };
};

describe('storeHookConstructor', () => {
  it('constructed hook should run store', () => {
    const { useSimpleStore, initialData, actionName } = simpleInitial();
    const { result } = renderHook(
      ({ initial }) => useSimpleStore(initial, actionName),
      {
        initialProps: { initial: initialData },
      }
    );
    expect(result.current.bs).toBeInstanceOf(BehaviorSubject);
    expect(result.current.bs.value).toEqual(initialData);
    expect(result.current.actions[actionName]).toBeDefined();
    expect(result.current.getValue()).toEqual(initialData);
  });
  it('constructed hook should ignore update if deps not updated', () => {
    const { useSimpleStore, initialData, actionName, actionName2 } =
      simpleInitial();
    const { result, rerender } = renderHook(
      ({ action }) => useSimpleStore(initialData, action, [initialData]),
      {
        initialProps: { action: actionName },
      }
    );
    expect(result.current.actions[actionName]).toBeDefined();
    expect(result.current.actions[actionName2]).not.toBeDefined();
    rerender({ action: actionName2 });
    expect(result.current.actions[actionName]).toBeDefined();
    expect(result.current.actions[actionName2]).not.toBeDefined();
  });
  it('constructed hook should recreate store if deps updated', () => {
    const { useSimpleStore, initialData, actionName, actionName2 } =
      simpleInitial();
    const { result, rerender } = renderHook(
      ({ action }) => useSimpleStore(initialData, action, [action]),
      {
        initialProps: { action: actionName },
      }
    );
    expect(result.current.actions[actionName]).toBeDefined();
    expect(result.current.actions[actionName2]).not.toBeDefined();
    rerender({ action: actionName2 });
    expect(result.current.actions[actionName]).not.toBeDefined();
    expect(result.current.actions[actionName2]).toBeDefined();
  });
});
