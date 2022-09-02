import { useOutletContext } from 'react-router-dom';
import { ContextType } from '../types/ContextType';

export function useChats() {
  return useOutletContext<ContextType>();
}