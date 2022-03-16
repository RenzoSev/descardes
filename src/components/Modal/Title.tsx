interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <span className="text-2xl font-bold uppercase text-blue-400">{title}</span>
  );
};

export default Title;
