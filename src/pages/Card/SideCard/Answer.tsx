interface AnswerProps {
  answer: string;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <div className="text-center text-4xl font-bold text-slate-800">
      <p className="break-word">{answer}</p>
    </div>
  );
};

export default Answer;
