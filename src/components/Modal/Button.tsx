import { ButtonHTMLAttributes } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonTitle: string;
  typeIcon: 'check' | 'close';
}

const Button: React.FC<ButtonProps> = ({ buttonTitle, typeIcon, ...rest }) => {
  const icons = {
    check: AiFillCheckCircle,
    close: AiFillCloseCircle,
  };
  const classNames = {
    check:
      'flex items-center justify-center gap-1 rounded-2xl border border-green-700 py-2 px-4 font-bold uppercase text-green-700 text-slate-100 transition-all disabled:opacity-50',
    close:
      'flex items-center justify-center gap-1 rounded-2xl border border-red-700 py-2 px-4 font-bold uppercase text-red-700 text-slate-100 transition-all disabled:opacity-50',
  };

  const IconByType = icons[typeIcon];
  const classNameByType = classNames[typeIcon];

  return (
    <button className={classNameByType} {...rest}>
      <IconByType />
      {buttonTitle}
    </button>
  );
};

export default Button;
