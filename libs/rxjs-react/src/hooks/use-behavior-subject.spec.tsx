import { act, renderHook } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { useBehaviorSubject } from './use-behavior-subject';

const initial = () => {
  const bsString = new BehaviorSubject<string>('Hello world');
  const bsString2 = new BehaviorSubject<string>('Hello world 2');

  return { bsString, bsString2 };
};

describe('useBehaviorSubject', () => {
  it('should return correct value', () => {
    const { bsString } = initial();
    const { result } = renderHook(() => useBehaviorSubject(bsString));
    expect(result.current).toBe(bsString.value);
  });
  it('should update on value change', () => {
    const { bsString } = initial();
    const { result } = renderHook(() => useBehaviorSubject(bsString));
    expect(result.current).toBe(bsString.value);
    const newValue = 'new value is here';
    act(() => {
      bsString.next(newValue);
    });
    expect(result.current).toBe(newValue);
  });
  it('should unsubscribe on unmount', () => {
    const { bsString } = initial();
    const { unmount } = renderHook(() => useBehaviorSubject(bsString));
    expect(bsString.observed).toBeTruthy();
    unmount();
    expect(bsString.observed).toBeFalsy();
  });

  it('should resubscribe on bs change', () => {
    const { bsString, bsString2 } = initial();
    const { result, rerender } = renderHook(
      ({ bs }) => useBehaviorSubject(bs),
      { initialProps: { bs: bsString } }
    );
    expect(result.current).toBe(bsString.value);
    expect(bsString.observed).toBeTruthy();
    expect(bsString2.observed).toBeFalsy();

    rerender({ bs: bsString2 });
    expect(result.current).toBe(bsString2.value);
    expect(bsString.observed).toBeFalsy();
    expect(bsString2.observed).toBeTruthy();
  });
});
