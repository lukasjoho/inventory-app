'use client';
import { useEffect } from 'react';
import { Modal, useModal } from '.';

const InterceptionModal = ({ children }: any) => {
  const { show, hide, setIsActiveInterception } = useModal();
  useEffect(() => {
    setIsActiveInterception(true);
    return () => setIsActiveInterception(false);
  }, []);
  useEffect(() => {
    show(<Modal>{children}</Modal>);
    return () => hide();
  }, []);
  return <></>;
};

export default InterceptionModal;
