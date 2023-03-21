import { useContext } from 'react';
import { ContextValue, ModelContextValue } from '../constants';

export const useLayoutEditorContext = () => {
  const context = useContext(ContextValue);
  if (!context)
    throw new Error(
      'useLayoutEditorContext used outside ContextValue.Provider'
    );
  return context;
};

export const useModelContext = () => {
  const context = useContext(ModelContextValue);
  if (!context)
    throw new Error('useModelContext used outside ModelContextValue.Provider');
  return context;
};
