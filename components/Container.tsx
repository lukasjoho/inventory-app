import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[2400px] px-3 md:px-8 lg:px-16 xl:px-32",
        props.className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
