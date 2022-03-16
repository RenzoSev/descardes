import { HTMLAttributes } from 'react';

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  labelTitle: string;
  name: string;
}

const Radio: React.FC<RadioProps> = ({ labelTitle, ...rest }) => {
  return (
    <label className="flex items-center gap-1">
      <input type={'radio'} {...rest} />
      {labelTitle}
    </label>
  );
};

export default Radio;
