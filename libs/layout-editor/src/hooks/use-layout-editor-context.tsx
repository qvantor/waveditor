import { useContext } from 'react';
import { ContextValue } from '../constants';

export const useLayoutEditorContext = () => {
  const context = useContext(ContextValue);
  if (!context)
    throw new Error(
      'useLayoutEditorContext used outside ContextValue.Provider'
    );
  return context;
};
