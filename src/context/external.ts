import { createContext } from 'react';
import { RNDTExternalContextVariables } from './types';

export const RNDTExternalContext =
  createContext<RNDTExternalContextVariables | null>(null);

export const RNDTExternalProvider = RNDTExternalContext.Provider;
