import { useContext } from 'react';
import { IframeContextValue } from './iframe-context';

export const useIframeContext = () => {
  const context = useContext(IframeContextValue);
  if (!context)
    throw new Error(
      'useIframeContext used outside IframeContextValue.Provider'
    );
  return context;
};
