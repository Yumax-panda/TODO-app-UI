import { useState } from "react";

export const useModal = () => {
  const [modalState, setOpen] = useState<null | string>(null);

  const openModal = (name: string) => setOpen(name);
  const closeModal = () => setOpen(null);

  return { modalState, openModal, closeModal };
};

export interface _ModalBaseProps {
  onClose: () => void;
}

export interface ModalProps extends _ModalBaseProps {
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className='z-3 fixed top-0 left-0 h-full w-full bg-gray-300/50' onClick={onClose}>
      <div
        className='md:w-4/7 absolute inset-0 my-auto mx-auto bg-white px-10 pt-10 pb-4 shadow-lg max-w-lg max-h-96 rounded-md'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
