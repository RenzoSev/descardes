import React, { HTMLAttributes } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';

interface FixedButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type: 'add';
  title: string;
}

const FixedButton: React.FC<FixedButtonProps> = ({
  type,
  title,
  children,
  ...rest
}) => {
  const icons = {
    add: RiAddCircleFill,
  };
  const IconByType = icons[type];

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center">
      {children}

      <button
        className="flex items-center justify-center gap-1 rounded-2xl bg-blue-700 py-2 px-4 font-bold uppercase text-slate-100"
        {...rest}
      >
        <IconByType />
        <p className='mt-0.5'>{title}</p>
      </button>
    </div>
  );
};

export default FixedButton;
