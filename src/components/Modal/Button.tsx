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

  const colors = {
    check: 'green',
    close: 'red',
  };

  const IconByType = icons[typeIcon];
  const colorByType = colors[typeIcon];

  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-2xl border border-${colorByType}-700 py-2 px-4 font-bold uppercase text-${colorByType}-700 text-slate-100 transition-all disabled:opacity-50`}
      {...rest}
    >
      <IconByType />
      {buttonTitle}
    </button>
  );
};

export default Button;
