import Answer from './Answer';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import Question from './Question';
import { useState } from 'react';
import { SideCard as SideCardTypes } from '../../../types/Cards';
import { BsArrowReturnRight, BsArrowReturnLeft } from 'react-icons/bs';

interface SideCardProps extends SideCardTypes {}

const SideCard: React.FC<SideCardProps> = ({ title, question, answer }) => {
  const [showBack, setShowBack] = useState(false);

  function toggleShowBack() {
    setShowBack(!showBack);
  }

  function renderFront() {
    return <Question question={question} />;
  }

  function renderBack() {
    return <Answer answer={answer} />;
  }

  function renderButtonChangeSide() {
    const ARROW_CLASS_NAME = 'text-3xl text-blue-800';

    return (
      <button onClick={toggleShowBack}>
        {showBack ? (
          <BsArrowReturnLeft className={ARROW_CLASS_NAME} />
        ) : (
          <BsArrowReturnRight className={ARROW_CLASS_NAME} />
        )}
      </button>
    );
  }

  return (
    <>
      <Header title={title} centerTitle={true} />

      <Container containerClassName="justify-center items-center gap-24">
        {!showBack && renderFront()}
        {showBack && renderBack()}

        {renderButtonChangeSide()}
      </Container>
    </>
  );
};

export default SideCard;
