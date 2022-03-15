interface SubtitleProps {
  subtitle: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle }) => {
  return (
    <h2 className="text-center text-2xl font-bold uppercase text-slate-700">
      {subtitle}
    </h2>
  );
};

export default Subtitle;
