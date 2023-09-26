'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { useWindowSize } from './hooks/useWindowSize';

interface ModalBackgroundProps {
  children: React.ReactNode;
}

export function ModalBackground({ children }: ModalBackgroundProps) {
  const { hide } = useContext(ModalContext);
  const { isMobile, isDesktop } = useWindowSize();
  const router = useRouter();
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 flex h-[100dvh] w-screen',
        isDesktop && 'px-16'
      )}
    >
      <motion.div
        onClick={() => hide()}
        className="fixed left-0 top-0 h-full w-full bg-opacity-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}
