interface SubtitleProps {
  subtitle: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle }) => {
  return <span className="text-lg font-light text-blue-500/75">{subtitle}</span>;
};

export default Subtitle;
