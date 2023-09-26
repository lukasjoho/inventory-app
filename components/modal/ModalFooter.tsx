interface ModalFooterProps {
  children: React.ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="sticky bottom-0 -mt-4 w-full bg-background p-4 md:-mt-6 md:p-6">
      {children}
    </div>
  );
}

// -mt-4 md:-mt-6
