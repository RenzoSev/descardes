import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { EssayCard as EssayCardTypes } from '../../../types/Cards';
import Question from './Question';
import Answer from './Answer';

interface EssayCardProps extends EssayCardTypes {}

const EssayCard: React.FC<EssayCardProps> = ({ title, question, answer }) => {
  return (
    <>
      <Header title={title} centerTitle={true} />

      <Container>
        <Question question={question} />

        <Answer answer={answer} />
      </Container>
    </>
  );
};

export default EssayCard;
