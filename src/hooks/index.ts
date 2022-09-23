import { useContext } from 'react';
import { RNDTInternalContext } from '../context/internal';
import { RNDTExternalContext } from '../context/external';

export const useRNDTExternal = () => {
  const context = useContext(RNDTExternalContext);

  if (context === null) {
    throw "'useRNDT' cannot be used out of the RNDT!";
  }

  return context;
};

export const useRNDTInternal = () => {
  const context = useContext(RNDTInternalContext);

  if (context === null) {
    throw "'useRNDT' cannot be used out of the RNDT!";
  }

  return context;
};
