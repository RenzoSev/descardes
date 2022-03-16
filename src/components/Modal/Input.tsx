import { HTMLAttributes } from 'react';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  labelTitle: string;
  colorStyle: 'blue';
}

const Input: React.FC<InputProps> = ({ labelTitle, colorStyle, ...rest }) => {
  const classNames = {
    blue: 'rounded-lg	border border-blue-200 py-1 px-2 outline-none transition-all focus:border-blue-400',
  };

  const classNameByType = classNames[colorStyle];

  return (
    <label className="flex flex-col gap-1 rounded">
      <p className="font-bold">{labelTitle}</p>
      <input maxLength={20} className={classNameByType} {...rest} />
    </label>
  );
};

export default Input;
