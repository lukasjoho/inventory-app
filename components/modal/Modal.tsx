"use client";

import { cn } from "@/lib/utils";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  id?: string;
}

export function Modal({ children, id, ...props }: ModalProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between bg-background",
        className
      )}
    >
      {children}
    </div>
  );
}
