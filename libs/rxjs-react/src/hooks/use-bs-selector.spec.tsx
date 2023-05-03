import { act, renderHook } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { useBsSelector } from './use-bs-selector';

type TestObject = { name: string; age: number };

const ageSelector = (obj: TestObject) => obj.age;
const initial = () => {
  const bsObject = new BehaviorSubject<TestObject>({ name: 'Ivan', age: 32 });

  return { bsObject };
};

describe('useBsSelector', () => {
  it('should select value from obj', () => {
    const { bsObject } = initial();
    const { result } = renderHook(
      ({ bs, selector }) => useBsSelector(bs, selector),
      {
        initialProps: { bs: bsObject, selector: ageSelector },
      }
    );
    expect(result.current).toBe(bsObject.value.age);
  });

  it('should update component if selected value updated', () => {
    const { bsObject } = initial();
    let renders = 0;
    const { result } = renderHook(
      ({ bs, selector }) => {
        renders++;
        return useBsSelector(bs, selector);
      },
      {
        initialProps: { bs: bsObject, selector: ageSelector },
      }
    );
    expect(result.current).toBe(bsObject.value.age);
    const newAge = 44;
    act(() => {
      bsObject.next({ ...bsObject.value, age: newAge });
    });
    expect(result.current).toBe(newAge);
    expect(renders).toBe(2);
  });

  it('should ignore if selected value not updated', () => {
    const { bsObject } = initial();
    let renders = 0;
    const { result } = renderHook(
      ({ bs, selector }) => {
        renders++;
        return useBsSelector(bs, selector);
      },
      {
        initialProps: { bs: bsObject, selector: ageSelector },
      }
    );
    expect(result.current).toBe(bsObject.value.age);
    expect(renders).toBe(1);

    act(() => {
      bsObject.next({ ...bsObject.value, name: 'Petr' });
    });
    expect(renders).toBe(1);
  });
});
