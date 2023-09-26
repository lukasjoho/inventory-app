'use client';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalPortal } from './ModalPortal';
import useFixBackground from './hooks/useFixBackground';

interface ModalProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveInterception, setIsActiveInterception] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const router = useRouter();
  const show = (content: React.ReactNode) => {
    console.log('show');
    setModalContent(content);
    setIsOpen(true);
  };

  const hide = () => {
    if (isActiveInterception) {
      router.back();
    }
    setIsOpen(false);
    setModalContent(false);
  };
  useFixBackground(isOpen);

  return (
    <ModalContext.Provider
      value={{
        show,
        hide,
        isOpen,
        isActiveInterception,
        setIsActiveInterception,
      }}
    >
      {children}
      <AnimatePresence>
        {isOpen && <ModalPortal>{modalContent}</ModalPortal>}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
