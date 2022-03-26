interface AnswerProps {
  answer: string;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <div className="flex shrink grow basis-auto items-center justify-center text-center text-3xl font-bold text-slate-700">
      <p className="break-word">{answer}</p>
    </div>
  );
};

export default Answer;
