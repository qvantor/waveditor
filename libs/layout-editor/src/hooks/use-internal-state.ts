import { useMemo } from 'react';
import { BehaviorSubject } from 'rxjs';
import { LinkElementToLayoutEvent } from '../types';

export const useInternalState = () =>
  useMemo(() => {
    const isDnd = new BehaviorSubject(false);
    const dndPreview = new BehaviorSubject<null | Omit<
      LinkElementToLayoutEvent['payload'],
      'samePosition'
    >>(null);
    return { isDnd, dndPreview };
  }, []);
