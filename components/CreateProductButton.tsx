"use client";
import React from "react";
import { Button } from "./ui/button";
import { useModal } from "./modal";
import ProductModal from "./ProductModal";

const CreateProductButton = () => {
  const { show } = useModal();
  return <Button onClick={() => show(<ProductModal />)}>Create product</Button>;
};

export default CreateProductButton;
