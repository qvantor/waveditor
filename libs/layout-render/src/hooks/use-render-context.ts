import { useContext } from 'react';
import { RenderContextValue } from '../constants';

export const useRenderContext = () => {
  const context = useContext(RenderContextValue);
  if (!context)
    throw new Error(
      'useRenderContext used outside RenderContextValue.Provider'
    );
  return context;
};
