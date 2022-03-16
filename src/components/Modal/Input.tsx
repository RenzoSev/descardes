import { HTMLAttributes } from 'react';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  labelTitle: string;
  colorStyle: string;
}

const Input: React.FC<InputProps> = ({ labelTitle, colorStyle, ...rest }) => {
  return (
    <label className="flex flex-col gap-1 rounded">
      {labelTitle}
      <input
        maxLength={20}
        className={`rounded-lg	border border-${colorStyle}-200 py-1 px-2 outline-none transition-all focus:border-${colorStyle}-400`}
        {...rest}
      />
    </label>
  );
};

export default Input;
