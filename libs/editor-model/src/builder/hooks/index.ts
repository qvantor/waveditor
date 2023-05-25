import { useContext } from 'react';
import { BuilderContext } from '../../types';
import { BuilderContextValue } from '../constants';

export const useBuilderContext = (): BuilderContext => {
  const builder = useContext(BuilderContextValue);
  if (!builder)
    throw new Error('useBuilderContext used outside of BuilderProvider');
  return builder;
};

export const useAction = <P, R>(
  action: (context: BuilderContext) => (params: P) => R
) => {
  const context = useBuilderContext();
  return action(context);
};
