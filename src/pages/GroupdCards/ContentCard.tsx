import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Modal from '../../components/Modal';
import Grid from '../../components/Grid/index';
import useCardManager from '../../hooks/useCardManager';
import useCardsContext from '../../hooks/useCardsContext';
import { BaseCard, CardTypes } from '../../types/Cards';
import { parseType } from '../../utils/parsers';

interface ContentCardProps extends BaseCard {
  groupId: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  answer,
  question,
  type,
  groupId,
  content,
}) => {
  const modalRef = useRef<Modal.ModalHandles>(null);
  const navigate = useNavigate();
  const {
    group: { groupCards, setGroupCards },
  } = useCardsContext();
  const {
    answer: answerToEdit,
    question: questionToEdit,
    title: titleToEdit,
    type: typeToEdit,
    setAnswer,
    setQuestion,
    setTitle,
    setType,
  } = useCardManager();

  const handleNavigateToCardPage = useCallback(() => {
    navigate(`/${id}`);
  }, []);

  function handleRemoveCard() {
    const cleanedGroupCards = groupCards.map((groupCard) => {
      if (groupCard.id !== groupId) return groupCard;

      const cleanedGroupCard = {
        ...groupCard,
        cards: groupCard.cards.filter((card) => card.id !== id),
      };

      return cleanedGroupCard;
    });

    setGroupCards(cleanedGroupCards);
  }

  function handleToggleModalEditCard() {
    modalRef.current?.toggleModal();
  }

  function handleEditCard() {
    const newGroupCards = groupCards.map((groupCard) => {
      if (groupCard.id !== groupId) return groupCard;

      const editedCard = {
        id,
        title: titleToEdit || title,
        question: questionToEdit || question,
        type: typeToEdit || type,
        answer: answerToEdit || answer,
        content: content,
      };

      const editedGroupCard = {
        ...groupCard,
        cards: groupCard.cards.map((card) => {
          if (card.id !== id) return card;

          return editedCard;
        }),
      };

      return editedGroupCard;
    });

    setGroupCards(newGroupCards);
    modalRef.current?.toggleModal();
  }

  function handleTitleCard(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleAnswerCard(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
  }

  function handleQuestionCard(e: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(e.target.value);
  }

  function handleTypeCard(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.value as CardTypes);
  }

  function renderModalEditCard() {
    function renderTitle() {
      return <Modal.Title title="Editar card:" />;
    }

    function renderInputs() {
      const typeParsed = parseType(type);

      return (
        <Modal.ContainerInputs>
          <Modal.Input
            onChange={handleTitleCard}
            colorStyle="blue"
            placeholder={title}
            labelTitle="Título:"
          />

          <Modal.Input
            onChange={handleQuestionCard}
            colorStyle="blue"
            placeholder={question}
            labelTitle="Questão:"
          />

          <Modal.Input
            onChange={handleAnswerCard}
            colorStyle="blue"
            placeholder={answer}
            labelTitle="Resposta:"
          />

          <Modal.Input
            onChange={handleTypeCard}
            colorStyle="blue"
            placeholder={typeParsed.replace(
              typeParsed[0],
              typeParsed[0].toUpperCase()
            )}
            labelTitle="Tipo de card:"
          />
        </Modal.ContainerInputs>
      );
    }

    function renderButtons() {
      const hasEditedAField = [
        titleToEdit,
        answerToEdit,
        questionToEdit,
        typeToEdit,
      ].some((field) => field);

      return (
        <Modal.ContainerButton>
          <Modal.Button
            buttonTitle="Editar!"
            typeIcon="check"
            disabled={!hasEditedAField}
            onClick={handleEditCard}
          />

          <Modal.Button
            buttonTitle="Fechar!"
            typeIcon="close"
            onClick={handleToggleModalEditCard}
          />
        </Modal.ContainerButton>
      );
    }

    return (
      <Modal.Container ref={modalRef} positionDimension="top-20 xs:top-44">
        {renderTitle()}
        {renderInputs()}
        {renderButtons()}
      </Modal.Container>
    );
  }

  return (
    <Grid.Container onClick={handleNavigateToCardPage}>
      <Grid.ContainerButton>
        <Grid.Button onClick={handleRemoveCard} type="delete" />

        <Grid.Button onClick={handleToggleModalEditCard} type="edit" />
      </Grid.ContainerButton>

      <Grid.ContainerDescription>
        <Grid.Title title={title} />
        <Grid.Description description={question} />
      </Grid.ContainerDescription>

      <Grid.Details details={parseType(type)} styles="uppercase" />

      {renderModalEditCard()}
    </Grid.Container>
  );
};

export default ContentCard;
