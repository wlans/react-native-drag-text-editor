import { createContext } from 'react';
import { RNDTInternalContextVariables } from './types';

export const RNDTInternalContext =
  createContext<RNDTInternalContextVariables | null>(null);

export const RNDTInternalProvider = RNDTInternalContext.Provider;
