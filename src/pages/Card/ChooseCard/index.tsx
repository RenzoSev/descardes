import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { ChooseCard as ChooseCardTypes } from '../../../types/Cards';
import Question from './Question';
import Answer from './Answer';
import { useState } from 'react';
import { FaRegEyeSlash, FaEyeSlash } from 'react-icons/fa';

interface ChooseCardProps extends ChooseCardTypes {}

const ChooseCard: React.FC<ChooseCardProps> = ({
  title,
  question,
  answer,
  content,
}) => {
  const answerOptions = [{ title: answer, isAnswer: true }, ...content.options];

  return (
    <>
      <Header title={title} centerTitle={true} />

      <Container containerClassName="justify-center items-center">
        <Question question={question} />

        <Answer answers={answerOptions} />
      </Container>
    </>
  );
};

export default ChooseCard;
