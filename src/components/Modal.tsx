import React from 'react';

const Modal: React.FC = ({ children }) => {
  function renderOverlay() {
    return (
      <div className="fixed top-0 left-0 z-40 h-full w-full bg-zinc-900/25"></div>
    );
  }

  return (
    <>
      {renderOverlay()}

      <div className="fixed top-1/4 left-0 right-0	z-50 flex justify-center">
        <div className="flex flex-col gap-8 rounded-lg bg-slate-100 p-6 shadow">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
