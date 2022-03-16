import React, { useRef, useCallback } from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import * as Modal from '../../components/Modal';
import useGroupCardsManager from '../../hooks/useGroupCardsManager';
import FixedButton from '../../components/FixedButton';

const CreateCardButton: React.FC = () => {
  const modalRef = useRef<Modal.ModalHandles>(null);
  const { title, setTitle, description, setDescription } =
    useGroupCardsManager();
  const {
    group: { groupCards, setGroupCards },
  } = useCardsContext();

  const handleCreateGroupCard = () => {
    const newGroupCard = {
      id: new Date().getTime(),
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
    return (
      <Modal.Container ref={modalRef}>
        <Modal.Title title="Criar card:" />

        <Modal.ContainerInputs>
          <Modal.Input
            onChange={handleTitle}
            colorStyle="blue"
            placeholder={title}
            labelTitle="Título:"
          />

          <Modal.Input
            onChange={handleDescription}
            colorStyle="blue"
            placeholder={description}
            labelTitle="Descrição:"
          />
        </Modal.ContainerInputs>

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
    </FixedButton>
  );
};

export default CreateCardButton;
