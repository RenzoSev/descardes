import React, { useState, useImperativeHandle, forwardRef } from 'react';

export interface ModalHandles {
  toggleModal: () => void;
}

interface ModalProps {
  initialStatus?: boolean;
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { children, initialStatus = false },
  ref
) => {
  const [showModal, setShowModal] = useState(initialStatus);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function renderOverlay() {
    return (
      <div
        className="fixed top-0 left-0 z-40 h-full w-full bg-zinc-900/25"
        onClick={toggleModal}
      />
    );
  }

  function renderModal() {
    return (
      <div className="fixed top-1/4 left-0 right-0	z-50 flex justify-center">
        <div className="flex flex-col gap-8 rounded-lg bg-slate-100 p-6 shadow">
          {children}
        </div>
      </div>
    );
  }

  useImperativeHandle(ref, () => ({ toggleModal }));

  if (!showModal) return <></>;

  return (
    <div>
      {renderOverlay()}
      {renderModal()}
    </div>
  );
};

export default forwardRef(Modal);
