'use client';
import { useContext, useEffect } from 'react';
import { DesktopModal } from './DesktopModal';
import MobileModal from './MobileModal';
import { ModalBackground } from './ModalBackground';
import { ModalContext } from './ModalContext';
import { useWindowSize } from './hooks/useWindowSize';

interface ModalPortalProps {
  children: React.ReactNode;
}
export function ModalPortal({ children }: ModalPortalProps) {
  const { windowSize, isMobile, isDesktop } = useWindowSize();
  const { isOpen, hide } = useContext(ModalContext);
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      hide();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  return (
    <>
      <ModalBackground>
        {isMobile && (
          <MobileModal windowSize={windowSize}>{children}</MobileModal>
        )}
        {isDesktop && <DesktopModal>{children}</DesktopModal>}
      </ModalBackground>
    </>
  );
}
