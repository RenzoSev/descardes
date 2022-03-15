import { HTMLAttributes } from "react";

interface GridContainer extends HTMLAttributes<HTMLDivElement> {

}

const GridContainer: React.FC<GridContainer> = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      className="flex cursor-pointer flex-col gap-2 rounded-lg bg-zinc-50 p-4 shadow"
    >
      {children}
    </div>
  );
};

export default GridContainer;
