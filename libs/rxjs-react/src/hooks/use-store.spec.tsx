import { renderHook } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { createStore, useStore } from '../';

type SimpleStore = { name: string; age: number };
const simpleInitial = () => {
  const initialData: SimpleStore = { name: 'Ivan', age: 32 };
  const actionName = 'rename';
  const actionName2 = 'rename2';
  const simpleStore = <T extends string>(name: T) =>
    createStore<SimpleStore>().addActions({
      [name]: (name: string, state) => ({ ...state, name }),
    });

  return {
    simpleStore,
    initialData,
    actionName,
    actionName2,
  };
};

describe('useStore', () => {
  it('constructed hook should run store', () => {
    const { initialData, actionName, simpleStore } = simpleInitial();
    const { result } = renderHook(
      ({ initial }) => useStore(simpleStore(actionName), initial),
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
    const { initialData, actionName, actionName2, simpleStore } =
      simpleInitial();
    const { result, rerender } = renderHook(
      ({ action }) => useStore(simpleStore(action), initialData),
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
    const { simpleStore, initialData, actionName, actionName2 } =
      simpleInitial();
    const { result, rerender } = renderHook(
      ({ action }) => useStore(simpleStore(action), initialData, [action]),
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
