import React, { useRef, useCallback } from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import * as Modal from '../../components/Modal';
import FixedButton from '../../components/FixedButton';
import useCardManager from '../../hooks/useCardManager';
import { CardTypes, ChooseCard, EssayCard, SideCard } from '../../types/Cards';
import getId from '../../utils/getId';

interface CreateCardButtonProps {
  groupCardId: number;
}

type NewCard = ChooseCard | EssayCard | SideCard;

const CreateCardButton: React.FC<CreateCardButtonProps> = ({ groupCardId }) => {
  const modalRef = useRef<Modal.ModalHandles>(null);
  const modalChooseCardRef = useRef<Modal.ModalHandles>(null);
  const {
    title,
    setTitle,
    answer,
    setAnswer,
    question,
    contentOption1,
    contentOption2,
    setQuestion,
    type,
    setType,
    setContentOption1,
    setContentOption2,
  } = useCardManager();
  const {
    group: { groupCards, setGroupCards },
  } = useCardsContext();

  function handleCreateCard() {
    if (type === 'choose' && (!contentOption1 || !contentOption2)) {
      modalRef.current?.toggleModal();
      modalChooseCardRef.current?.toggleModal();
      return;
    }

    function parseCardWithContent() {
      const content = {
        options: [{ title: contentOption1 }, { title: contentOption2 }],
      };

      return {
        id: getId(),
        title,
        answer,
        question,
        type: type as CardTypes,
        content,
      };
    }

    function parseCardWithoutContent() {
      return {
        id: getId(),
        title,
        answer,
        question,
        type: type as CardTypes,
        content: {},
      };
    }

    function parseNewCard() {
      if (contentOption1 && contentOption2) {
        return parseCardWithContent() as NewCard;
      }

      return parseCardWithoutContent() as NewCard;
    }

    const newGroupCards = groupCards.map((groupCard) => {
      if (groupCard.id !== groupCardId) return groupCard;

      const newCard = parseNewCard();

      return {
        ...groupCard,
        cards: [...groupCard.cards, newCard],
      };
    });

    setGroupCards(newGroupCards);
    setContentOption1('');
    setContentOption2('');
    modalChooseCardRef.current?.toggleModal();
  }

  const handleShowModalGroupCard = useCallback(() => {
    modalRef.current?.toggleModal();
  }, []);

  const handleShownModalChooseCard = useCallback(() => {
    modalChooseCardRef.current?.toggleModal();
  }, []);

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleAnswer(e: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(e.target.value);
  }

  function handleQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(e.target.value);
  }

  function handleType(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.id as CardTypes);
  }

  function handleContentOption1(e: React.ChangeEvent<HTMLInputElement>) {
    setContentOption1(e.target.value as CardTypes);
  }

  function handleContentOption2(e: React.ChangeEvent<HTMLInputElement>) {
    setContentOption2(e.target.value as CardTypes);
  }

  // TODO: CREATE COMPONENTS TO MODALS?

  function renderModalCreateCard() {
    function renderTitle() {
      return <Modal.Title title="Criar card:" />;
    }

    function renderInputs() {
      return (
        <Modal.ContainerInputs>
          <Modal.Input
            onChange={handleTitle}
            colorStyle="blue"
            placeholder={'ex: Aritmética'}
            labelTitle="Título:"
            maxLength={40}
          />

          <Modal.Input
            onChange={handleQuestion}
            colorStyle="blue"
            placeholder={'ex: Quanto é 2 + 2'}
            labelTitle="Questão:"
            maxLength={40}
          />

          <Modal.Input
            onChange={handleAnswer}
            colorStyle="blue"
            placeholder={'ex: 4'}
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
            onChange={handleType}
          />

          <Modal.Radio
            id={'side'}
            labelTitle={'Frente e verso'}
            name={RADIO_NAME}
            onChange={handleType}
          />

          <Modal.Radio
            id={'choose'}
            labelTitle={'Múltipla Escolha'}
            name={RADIO_NAME}
            onChange={handleType}
          />
        </Modal.ContainerRadio>
      );
    }

    function renderButtons() {
      return (
        <Modal.ContainerButton>
          <Modal.Button
            buttonTitle="Feito!"
            typeIcon="check"
            disabled={!title || !answer || !question || !type}
            onClick={handleCreateCard}
          />

          <Modal.Button
            buttonTitle="Fechar!"
            typeIcon="close"
            onClick={handleShowModalGroupCard}
          />
        </Modal.ContainerButton>
      );
    }

    return (
      <Modal.Container ref={modalRef} positionDimension="top-12 xs:top-36">
        {renderTitle()}
        {renderInputs()}
        {renderRadios()}
        {renderButtons()}
      </Modal.Container>
    );
  }

  function renderModalCreateChooseCard() {
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
            onClick={handleCreateCard}
          />

          <Modal.Button
            buttonTitle="Fechar!"
            typeIcon="close"
            onClick={handleShownModalChooseCard}
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
    <FixedButton
      type="add"
      title="Criar card"
      onClick={handleShowModalGroupCard}
    >
      {renderModalCreateCard()}
      {renderModalCreateChooseCard()}
    </FixedButton>
  );
};

export default CreateCardButton;
