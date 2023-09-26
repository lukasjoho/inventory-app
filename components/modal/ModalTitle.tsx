import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const ModalTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'pointer-events-none text-xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));

ModalTitle.displayName = 'ModalTitle';
