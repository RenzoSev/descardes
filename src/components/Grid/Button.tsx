import { HTMLAttributes } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import withoutParentsActionPropagation from '../../utils/withoutParentsActionPropagation';

interface GridButton extends HTMLAttributes<HTMLButtonElement> {
  type: 'delete' | 'edit';
}

const GridButton: React.FC<GridButton> = ({ type, onClick, ...rest }) => {
  const classNames = {
    delete: 'relative right-8 z-50 text-lg text-red-700',
    edit: 'relative right-8 z-50 text-lg text-blue-700',
  };
  const classNameByType = classNames[type];

  const icons = {
    delete: AiFillDelete,
    edit: AiFillEdit,
  };
  const IconByType = icons[type];

  return (
    <button
      {...rest}
      className={classNameByType}
      onClick={(e) => withoutParentsActionPropagation(e, onClick)}
    >
      <IconByType />
    </button>
  );
};

export default GridButton;
