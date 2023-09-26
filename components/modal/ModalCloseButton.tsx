'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { forwardRef, useContext } from 'react';
import { ModalContext } from './ModalContext';

export const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { hide } = useContext(ModalContext);
  return (
    <Button
      ref={ref}
      className={cn('z-10 h-auto p-0.5', className)}
      variant="ghost"
      onClick={() => hide()}
      {...props}
    >
      <X className="h-4 w-4" />
    </Button>
  );
});

ModalCloseButton.displayName = 'ModalCloseButton';
