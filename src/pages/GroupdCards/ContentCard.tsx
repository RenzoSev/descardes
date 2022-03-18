// TODO: CreateCardButton and EditButton form here has almost the same logic.
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Modal from '../../components/Modal';
import Grid from '../../components/Grid/index';
import useCardManager from '../../hooks/useCardManager';
import useCardsContext from '../../hooks/useCardsContext';
import { BaseCard, Card, CardTypes } from '../../types/Cards';
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
}) => {
  const modalRef = useRef<Modal.ModalHandles>(null);
  const modalChooseCardRef = useRef<Modal.ModalHandles>(null);
  const navigate = useNavigate();
  const {
    group: { groupCards, setGroupCards },
  } = useCardsContext();
  const {
    answer: answerToEdit,
    question: questionToEdit,
    title: titleToEdit,
    type: typeToEdit,
    contentOption1,
    contentOption2,
    setAnswer,
    setQuestion,
    setTitle,
    setType,
    setContentOption1,
    setContentOption2,
  } = useCardManager();

  const handleNavigateToCardPage = useCallback(() => {
    navigate(`/${groupId}/${id}`);
  }, []);

  function handleToggleModalChooseCard() {
    modalChooseCardRef.current?.toggleModal();
  }

  function handleToggleModalEditCard() {
    modalRef.current?.toggleModal();
  }

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

  function handleEditCard() {
    if (typeToEdit === 'choose' && (!contentOption1 || !contentOption2)) {
      modalRef.current?.toggleModal();
      modalChooseCardRef.current?.toggleModal();
      return;
    }

    function parseCardWithContent() {
      const content = {
        options: [{ title: contentOption1 }, { title: contentOption2 }],
      };

      return {
        id,
        title: titleToEdit || title,
        question: questionToEdit || question,
        type: typeToEdit || type,
        answer: answerToEdit || answer,
        content,
      };
    }

    function parseCardWithoutContent() {
      return {
        id,
        title: titleToEdit || title,
        question: questionToEdit || question,
        type: typeToEdit || type,
        answer: answerToEdit || answer,
        content: {},
      };
    }

    function parseEditCard() {
      if (contentOption1 && contentOption2) {
        return parseCardWithContent() as Card;
      }

      return parseCardWithoutContent() as Card;
    }

    const newGroupCards = groupCards.map((groupCard) => {
      if (groupCard.id !== groupId) return groupCard;

      const editedCard = parseEditCard();

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

    if (contentOption1 && contentOption2) {
      setContentOption1('');
      setContentOption2('');
      modalChooseCardRef.current?.toggleModal();
      return;
    }

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
    setType(e.target.id as CardTypes);
  }

  function handleContentOption1(e: React.ChangeEvent<HTMLInputElement>) {
    setContentOption1(e.target.value as CardTypes);
  }

  function handleContentOption2(e: React.ChangeEvent<HTMLInputElement>) {
    setContentOption2(e.target.value as CardTypes);
  }

  function renderModalEditCard() {
    function renderTitle() {
      return <Modal.Title title="Editar card:" />;
    }

    function renderInputs() {
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
        </Modal.ContainerInputs>
      );
    }

    function renderRadios() {
      const RADIO_NAME = 'card-type';

      return (
        <Modal.ContainerRadio labelTitle="Qual o tipo de card?">
          <Modal.Radio
            id={'essay'}
            labelTitle={'Dissertativo'}
            name={RADIO_NAME}
            onChange={handleTypeCard}
          />

          <Modal.Radio
            id={'side'}
            labelTitle={'Frente e verso'}
            name={RADIO_NAME}
            onChange={handleTypeCard}
          />

          <Modal.Radio
            id={'choose'}
            labelTitle={'Múltipla Escolha'}
            name={RADIO_NAME}
            onChange={handleTypeCard}
          />
        </Modal.ContainerRadio>
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
        {renderRadios()}
        {renderButtons()}
      </Modal.Container>
    );
  }

  function renderModalEditChooseCard() {
    function renderTitle() {
      return <Modal.Title title="Múltipla escolha:" />;
    }

    function renderSubtitle() {
      return (
        <Modal.Subtitle subtitle="Essas são as outras opções que aparecerão como possíveis escolhas." />
      );
    }

    function renderInputs() {
      return (
        <Modal.ContainerInputs>
          <Modal.Input
            onChange={handleContentOption1}
            colorStyle="blue"
            labelTitle="Opção 1:"
            maxLength={40}
          />

          <Modal.Input
            onChange={handleContentOption2}
            colorStyle="blue"
            labelTitle="Opção 2:"
          />
        </Modal.ContainerInputs>
      );
    }

    function renderButtons() {
      return (
        <Modal.ContainerButton>
          <Modal.Button
            buttonTitle="Feito!"
            typeIcon="check"
            disabled={!contentOption1 || !contentOption2}
            onClick={handleEditCard}
          />

          <Modal.Button
            buttonTitle="Fechar!"
            typeIcon="close"
            onClick={handleToggleModalChooseCard}
          />
        </Modal.ContainerButton>
      );
    }

    return (
      <Modal.Container ref={modalChooseCardRef}>
        <div className="flex flex-col gap-1">
          {renderTitle()}
          {renderSubtitle()}
        </div>
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
      {renderModalEditChooseCard()}
    </Grid.Container>
  );
};

export default ContentCard;
