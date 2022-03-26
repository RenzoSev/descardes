interface GridTitle {
  title: string;
}

const GridTitle: React.FC<GridTitle> = ({ title }) => {
  return (
    <h3 className="overflow-hidden text-ellipsis text-xl font-bold text-slate-700">
      {title}
    </h3>
  );
};

export default GridTitle;
