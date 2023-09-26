'use client';
import React from 'react';
import { Button } from './ui/button';
import { useModal } from './modal';
import ProductForm from './ProductForm';

const CreateProductButton = () => {
  const { show } = useModal();
  return <Button onClick={() => show(<ProductForm />)}>Create product</Button>;
};

export default CreateProductButton;
