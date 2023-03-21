import { createContext } from 'react';
import { Context, ModelContext } from '../types';

export const ContextValue = createContext<Context | null>(null);
export const ModelContextValue = createContext<ModelContext | null>(null);
