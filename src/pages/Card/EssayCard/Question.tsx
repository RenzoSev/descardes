interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <h2 className="break-word text-center text-4xl font-bold text-blue-800">
      {question}
    </h2>
  );
};

export default Question;
