import React, { useRef, useCallback } from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import * as Modal from '../Modal/index';
import useGroupCardsManager from '../../hooks/useGroupCardsManager';
import FixedButton from '../FixedButton';
import getId from '../../utils/getId';

const CreateGroupCardButton: React.FC = () => {
  const modalRef = useRef<Modal.ModalHandles>(null);
  const { title, setTitle, description, setDescription } =
    useGroupCardsManager();
  const {
    group: { groupCards, setGroupCards },
  } = useCardsContext();

  const handleCreateGroupCard = () => {
    const newGroupCard = {
      id: getId(),
      title,
      description,
      cards: [],
    };
    const newGroupCards = [...groupCards, newGroupCard];

    setGroupCards(newGroupCards);
    modalRef.current?.toggleModal();
  };

  const handleShowModalGroupCard = useCallback(() => {
    modalRef.current?.toggleModal();
  }, []);

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function renderModalCreateCard() {
    function renderTitle() {
      return <Modal.Title title="Criar grupo de cards:" />;
    }

    function renderInputs() {
      return (
        <Modal.ContainerInputs>
          <Modal.Input
            onChange={handleTitle}
            colorStyle="blue"
            labelTitle="Título:"
          />

          <Modal.Input
            onChange={handleDescription}
            colorStyle="blue"
            placeholder={'Este campo é opcional.'}
            labelTitle="Descrição:"
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
            disabled={!title}
            onClick={handleCreateGroupCard}
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
      <Modal.Container ref={modalRef}>
        {renderTitle()}
        {renderInputs()}
        {renderButtons()}
      </Modal.Container>
    );
  }

  return (
    <FixedButton
      type="add"
      title="Criar grupo de card"
      onClick={handleShowModalGroupCard}
    >
      {renderModalCreateCard()}
    </FixedButton>
  );
};

export default CreateGroupCardButton;
