"use client";
import { motion } from "framer-motion";

interface DesktopModalProps {
  children: React.ReactNode;
}

export function DesktopModal({ children }: DesktopModalProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-h-[90%] min-w-[300px] max-w-[900px] self-center overflow-scroll rounded-lg border shadow-md"
    >
      {children}
    </motion.div>
  );
}
