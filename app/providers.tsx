"use client";
import { ModalProvider } from "@/components/modal";
import React from "react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      {children}{" "}
      <Toaster
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "rgb(34 197 94)",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "rgb(34 197 94)",
            },
          },
          error: {
            style: {
              background: "rgb(239 68 68)",
              color: "white",
            },

            iconTheme: {
              primary: "white",
              secondary: "rgb(239 68 68)",
            },
          },
        }}
      />
    </ModalProvider>
  );
};

export default Providers;
