interface ModalFooterProps {
  children: React.ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className="p-4 md:p-6 w-full bg-green-500">{children}</div>;
}

// -mt-4 md:-mt-6
