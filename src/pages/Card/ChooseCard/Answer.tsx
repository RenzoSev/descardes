import { useState } from 'react';
import { FaEyeSlash, FaRegEyeSlash } from 'react-icons/fa';

// TODO: USES CHOOSE CARD TYPES:
interface AnswerProps {
  answers: { title: string; isAnswer?: boolean }[];
}

const Answer: React.FC<AnswerProps> = ({ answers }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const optionsLetter = ['A)', 'B)', 'C)'];
  const COLOR_WITHOUT_SHOW_ANSWER = 'flex gap-4 transition-all text-slate-800';
  const COLOR_WRONG_ANSWER = 'flex gap-4 transition-all text-red-800';
  const COLOR_RIGHT_ANSWER = 'flex gap-4 transition-all text-green-800';

  function toggleShowAnswer() {
    setShowAnswer(!showAnswer);
  }

  function renderButtonShowAnswer() {
    const EYES_BUTTON_CLASS_NAME = 'text-3xl';

    return (
      <button onClick={toggleShowAnswer}>
        {showAnswer ? (
          <FaRegEyeSlash className={EYES_BUTTON_CLASS_NAME} />
        ) : (
          <FaEyeSlash className={EYES_BUTTON_CLASS_NAME} />
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-14">
      <div className="flex shrink grow basis-auto flex-col items-start justify-center gap-4 text-center text-3xl font-bold text-slate-700">
        {answers.map(({ title, isAnswer }, index) => {
          if (isAnswer)
            return (
              <div
                className={
                  showAnswer ? COLOR_RIGHT_ANSWER : COLOR_WITHOUT_SHOW_ANSWER
                }
              >
                <span>{optionsLetter[index]}</span>
                <span className='break-word'>{title}</span>
              </div>
            );

          return (
            <div
              className={
                showAnswer ? COLOR_WRONG_ANSWER : COLOR_WITHOUT_SHOW_ANSWER
              }
            >
              <span>{optionsLetter[index]}</span>
              <span className='break-word'>{title}</span>
            </div>
          );
        })}
      </div>

      {renderButtonShowAnswer()}
    </div>
  );
};

export default Answer;
