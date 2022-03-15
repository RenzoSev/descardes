import { HTMLAttributes } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import withoutPropagation from '../../utils/withoutPropagation';

interface GridButton extends HTMLAttributes<HTMLButtonElement> {
  type: 'delete' | 'edit';
}

const GridButton: React.FC<GridButton> = ({ type, onClick, ...rest }) => {
  const colors = {
    delete: 'red',
    edit: 'blue',
  };
  const colorByType = colors[type];

  const icons = {
    delete: AiFillDelete,
    edit: AiFillEdit,
  };
  const IconByType = icons[type];

  return (
    <button
      {...rest}
      className={`relative right-8 z-50 text-lg text-${colorByType}-700`}
      onClick={(e) => withoutPropagation(e, onClick)}
    >
      <IconByType />
    </button>
  );
};

export default GridButton;
