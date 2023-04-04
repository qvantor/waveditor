import { createContext } from 'react';
import { RenderContext } from '../types';

export const RenderContextValue = createContext<RenderContext | null>(null);
