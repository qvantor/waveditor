import { useContext } from 'react';
import { MailBuilderContext } from '../constants';

export const useMailBuilderContext = () => {
  const context = useContext(MailBuilderContext);
  if (!context)
    throw new Error(
      'useMailBuilderContext used outside MailBuilderContext.Provider'
    );
  return context;
};
