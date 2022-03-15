interface GridDescription {
  description: string;
}

const GridDescription: React.FC<GridDescription> = ({ description }) => {
  return <h4 className="text-normal text-slate-700">{description}</h4>;
};

export default GridDescription;
