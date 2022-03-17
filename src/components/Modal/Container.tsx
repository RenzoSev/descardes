import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { ModalHandles } from '.';
import withoutParentsActionPropagation from '../../utils/withoutParentsActionPropagation';

interface ModalProps {
  initialStatus?: boolean;
  positionDimension?: string;
  children: any; // TODO: it must not be resolved with any type. fix this type bug when pass a children to Modal
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = (
  { children, initialStatus = false, positionDimension },
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
    const BASE_CLASS_NAME = 'fixed left-0 right-0	z-50 flex justify-center';
    const TOP_DEFAULT_DIMENSION = 'top-1/4';
    const TOP_DIMENSION = positionDimension || TOP_DEFAULT_DIMENSION;

    const containerModalClassName = BASE_CLASS_NAME + " " + TOP_DIMENSION;

    return (
      <div
        className={containerModalClassName}
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
