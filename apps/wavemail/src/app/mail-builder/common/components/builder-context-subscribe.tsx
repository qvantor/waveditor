import { builderSubscribe, useBuilderContext } from '@waveditors/editor-model';
import { useEffect } from 'react';
import { useSaveSnapshot } from '../../versions';

export const BuilderContextSubscribe = () => {
  const saveSnapshot = useSaveSnapshot();
  const context = useBuilderContext();
  useEffect(() => {
    const unsub = builderSubscribe(context, saveSnapshot);
    return () => unsub();
  }, [context, saveSnapshot]);
  return null;
};
