'use client';

import { cn } from '@/lib/utils';

interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLFormElement> {
  children: React.ReactNode;
  as?: 'div' | 'form';
  id?: string;
}

export function Modal({ children, as = 'div', id, ...props }: ModalProps) {
  const { className, ...rest } = props;
  const defaultClassNames =
    'relative flex flex-col justify-between bg-background';
  if (as === 'form') {
    return (
      <form className={cn(defaultClassNames, className)} id={id} {...rest}>
        {children}
      </form>
    );
  }
  return (
    <div className={cn(defaultClassNames, className)} {...rest}>
      {children}
    </div>
  );
}
