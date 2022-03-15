interface GridDetails {
  details: string;
}

const GridDetails: React.FC<GridDetails> = ({ details }) => {
  return <p className="text-sm text-slate-700/50">{details}</p>;
};

export default GridDetails;
