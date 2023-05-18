import { jest } from '@jest/globals';
import { createStore } from './create-store';

type SimpleStore = { name: string; age: number };
const initial = () => {
  const testStoreData: SimpleStore = { name: 'Ivan', age: 32 };
  const newAge = 89;

  const setAge = (age: number, state: SimpleStore) => ({ ...state, age });
  const setName = (name: string, state: SimpleStore) => ({ ...state, name });

  const testStore = createStore<SimpleStore>().addActions({
    setAge,
  });

  return { testStore, testStoreData, setAge, setName, newAge };
};

describe('createStore', () => {
  it('should initialize data', () => {
    const { testStoreData, testStore } = initial();
    const store = testStore.run(testStoreData);

    expect(store.getValue()).toEqual(testStoreData);
    expect(store.bs.value).toEqual(testStoreData);
  });
  it('should add actions', () => {
    const { testStoreData, testStore, newAge } = initial();
    const store = testStore.run(testStoreData);
    expect(store.actions.setAge).toBeDefined();
    expect(store.getValue().age).toBe(testStoreData.age);
    store.actions.setAge(newAge);
    expect(store.getValue().age).toBe(newAge);
  });
  it('should add effects with beforeAction/afterAction', () => {
    const { testStoreData, testStore, newAge } = initial();
    const beforeAction = jest.fn(() => true);
    const afterAction = jest.fn();
    const store = testStore
      .addEffect(() => ({ afterAction, beforeAction }))
      .run(testStoreData);
    store.actions.setAge(newAge);

    expect(afterAction).toHaveBeenCalledTimes(1);
    expect(afterAction).toBeCalledWith(
      expect.objectContaining({
        next: { ...testStoreData, age: newAge },
        name: 'setAge',
        event: newAge,
      })
    );

    expect(beforeAction).toHaveBeenCalledTimes(1);
    expect(beforeAction).toBeCalledWith(
      expect.objectContaining({
        next: { ...testStoreData, age: newAge },
        name: 'setAge',
        event: newAge,
      })
    );
  });
  it('should collect effects subscriptions and unsubscribe', () => {
    const { testStoreData, testStore, newAge } = initial();
    const observer = jest.fn();
    const store = testStore
      .addEffect(() => ({
        subscriptions: ({ bs }) => [bs.subscribe(observer)],
      }))
      .run(testStoreData);
    const unsubscribe = store.subscribe();
    expect(observer).toHaveBeenCalledTimes(1);
    store.actions.setAge(newAge);
    expect(observer).toHaveBeenCalledTimes(2);

    expect(store.bs.observed).toBeTruthy();
    unsubscribe()
    expect(store.bs.observed).toBeFalsy();
  });

  it('should filter actions in effects', () => {
    const { testStoreData, testStore, newAge, setName } = initial();
    const beforeAction = jest.fn(() => true);
    const afterAction = jest.fn();
    const store = testStore
      .addActions({ setName })
      .addEffect(() => ({
        filterActions: ['setName'],
        beforeAction,
        afterAction,
      }))
      .run(testStoreData);
    store.actions.setName('new name');
    expect(beforeAction).toHaveBeenCalledTimes(0);
    expect(afterAction).toHaveBeenCalledTimes(0);

    store.actions.setAge(newAge);
    expect(beforeAction).toHaveBeenCalledTimes(1);
    expect(afterAction).toHaveBeenCalledTimes(1);
  });
});
