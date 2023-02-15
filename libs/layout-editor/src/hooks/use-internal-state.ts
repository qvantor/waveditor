import { useMemo } from 'react';
import { BehaviorSubject } from 'rxjs';
import { LayoutAddChild } from '@waveditors/editor-model';

export const useInternalState = () =>
  useMemo(() => {
    const isDnd = new BehaviorSubject(false);
    const dndPreview = new BehaviorSubject<null | LayoutAddChild>(null);
    return { isDnd, dndPreview };
  }, []);
