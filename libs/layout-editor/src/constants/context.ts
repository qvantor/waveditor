import { createContext } from 'react';
import { Context } from '../types';

export const ContextValue = createContext<Context | null>(null);
