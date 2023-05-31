import { createContext } from 'react';
import { BuilderContext } from '../../types';

export const BuilderContextValue = createContext<BuilderContext | null>(null);
export const BuilderProvider = BuilderContextValue.Provider;
