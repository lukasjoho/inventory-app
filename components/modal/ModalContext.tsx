import { createContext } from 'react';

export const ModalContext = createContext<{
  show: (content: React.ReactNode) => void;
  hide: () => void;
  isOpen: boolean;

  isActiveInterception: boolean;
  setIsActiveInterception: (value: boolean) => void;
}>({
  show: () => {},
  hide: () => {},
  isOpen: false,

  isActiveInterception: false,
  setIsActiveInterception: () => {},
});
