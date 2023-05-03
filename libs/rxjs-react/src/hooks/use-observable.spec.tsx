import { renderHook } from '@testing-library/react';
import { Subject } from 'rxjs';
import { useObservable } from './use-observable';

const initial = () => {
  const initialValue = 'hello world';
  const sString = new Subject<string>();
  const sString2 = new Subject<string>();

  return { sString, sString2, initialValue };
};

describe('useObservable', () => {
  it('should return correct value', () => {
    const { sString, initialValue } = initial();
    const { result } = renderHook(
      ({ subject, initial }) => useObservable(subject, initial),
      {
        initialProps: { subject: sString, initial: initialValue },
      }
    );
    expect(result.current).toBe(initialValue);
  });

  it('should resubscribe on deps change', () => {
    const { sString, sString2, initialValue } = initial();
    const { result, rerender } = renderHook(
      ({ subject, initial }) => useObservable(subject, initial, [subject]),
      {
        initialProps: { subject: sString, initial: initialValue },
      }
    );
    expect(sString.observed).toBeTruthy();
    expect(sString2.observed).toBeFalsy();
    rerender({ subject: sString2, initial: initialValue });
    expect(sString.observed).toBeFalsy();
    expect(sString2.observed).toBeTruthy();
    // but value still, from previous subject, until new subject .next()
    expect(result.current).toBe(initialValue);
  });
});
