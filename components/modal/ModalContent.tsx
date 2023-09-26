import { cn } from '@/lib/utils';

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalContent({ children, ...props }: ModalContentProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'shrink overflow-scroll px-4 py-4 md:px-6 md:py-6',
        className
      )}
      id="modal-content"
      {...rest}
    >
      {children}
    </div>
  );
}
