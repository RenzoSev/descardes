interface GridDetails {
  details: string;
  styles?: string;
}

const GridDetails: React.FC<GridDetails> = ({ details, styles = '' }) => {
  const BASE_CLASS_NAME = 'text-sm text-slate-700/50';
  const className = BASE_CLASS_NAME + ' ' + styles;

  return <p className={className}>{details}</p>;
};

export default GridDetails;
