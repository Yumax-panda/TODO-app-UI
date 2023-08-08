import { useState } from "react";

export const useModal = () => {
  const [isModalOpened, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { isModalOpened, openModal, closeModal };
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
        className='h-6/7 w-6/7 md:w-4/7 absolute inset-0 my-auto mx-auto overflow-y-scroll bg-white px-12 pt-12 pb-4 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
