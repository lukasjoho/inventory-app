import { ModalCloseButton } from './ModalCloseButton';

interface ModalHeaderProps {
  children: React.ReactNode;
}

export function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <div
      className="drag sticky top-0 z-10 -mb-4 w-full bg-background p-4 md:-mb-6 md:p-6"
      id="modal-header"
    >
      <ModalCloseButton className="absolute right-5 top-5 -translate-y-1/2 translate-x-1/2 md:right-6 md:top-6" />
      {children}
    </div>
  );
}
