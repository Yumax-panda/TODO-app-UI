import { useState } from "react";

export const useModal = () => {
  const [isModalOpened, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { isModalOpened, openModal, closeModal };
};

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalProps> = ({ onClose, children }) => {
  return <div>{children}</div>;
};
