import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { ModalHandles } from '.';
import withoutParentsActionPropagation from '../../utils/withoutParentsActionPropagation';

interface ModalProps {
  initialStatus?: boolean;
  children: any; // TODO: it must not be resolved with any type. fix this type bug when pass a children to Modal
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
        onClick={(e) => withoutParentsActionPropagation(e, toggleModal)}
      />
    );
  }

  function renderModal() {
    return (
      <div
        className="fixed top-1/4 left-0 right-0	z-50 flex justify-center"
        onClick={(e) => withoutParentsActionPropagation(e)}
      >
        <div className="flex w-86 flex-col gap-8 rounded-lg bg-slate-100 p-6 shadow">
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
