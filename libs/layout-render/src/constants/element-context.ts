import { createContext, HTMLAttributes, useContext } from 'react';

export interface ElementContext {
  isSelected: boolean;
  parentWidth: number;
  attributes?: HTMLAttributes<HTMLDivElement>;
}

export const ElementContextValue = createContext<ElementContext | null>(null);

export const ElementContextProvider = ElementContextValue.Provider;

export const useElementContext = () => {
  const value = useContext(ElementContextValue);
  if (!value)
    throw new Error('Element is used outside of ElementContextProvider');
  return value;
};
