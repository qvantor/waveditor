import { useContext, useMemo } from 'react';
import { BuilderContext } from '../../types';
import { BuilderContextValue } from '../constants';

export const useBuilderContext = (): BuilderContext => {
  const builder = useContext(BuilderContextValue);
  if (!builder)
    throw new Error('useBuilderContext used outside of BuilderProvider');
  return builder;
};

export const useAction = <R>(
  action: (context: BuilderContext) => R,
  deps: unknown[] = []
) => {
  const context = useBuilderContext();
  return useMemo(() => action(context), [context, ...deps]);
};
