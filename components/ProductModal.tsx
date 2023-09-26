import React from "react";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "./modal";
import ProductForm from "./ProductForm";
import { Prisma } from "@prisma/client";

interface ProductModalProps {
  product?: Prisma.ProductGetPayload<{}>;
}

const ProductModal = ({ product }: ProductModalProps) => {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>{product ? "Edit product" : "Create product"}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <ProductForm product={product} />
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
