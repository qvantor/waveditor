import { useMemo } from 'react';
import { BehaviorSubject } from 'rxjs';
import { Position } from '@waveditors/editor-model';

export const useInternalState = () =>
  useMemo(() => {
    const isDnd = new BehaviorSubject(false);
    const isInteractive = new BehaviorSubject(true);
    const dndPreview = new BehaviorSubject<null | Position>(null);
    return { isDnd, isInteractive, dndPreview };
  }, []);
