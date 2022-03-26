import React, { useCallback, useRef } from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import { GroupCard as GroupCardTypes } from '../../types/Cards';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import * as Modal from '../../components/Modal';
import useGroupCardsManager from '../../hooks/useGroupCardsManager';
import { useNavigate } from 'react-router-dom';
import Grid from '../../components/Grid';
import withoutParentsActionPropagation from '../../utils/withoutParentsActionPropagation';

const GroupCard: React.FC<GroupCardTypes> = ({
  title,
  description,
  cards,
  id,
}) => {
  const {
    group: { groupCards, setGroupCards },
  } = useCardsContext();
  const {
    title: titleToEdit,
    setTitle,
    description: descriptionToEdit,
    setDescription,
  } = useGroupCardsManager();
  const modalRef = useRef<Modal.ModalHandles>(null);
  const navigate = useNavigate();

  const resetStates = () => {
    setTitle('');
    setDescription('');
  };

  const handleNavigateToGroupCardPage = useCallback(() => {
    navigate(`/${id}`);
  }, []);

  function handleRemoveGroupCard() {
    const cleanedGroupCards = groupCards.filter(
      (groupCard) => groupCard.id !== id
    );

    setGroupCards(cleanedGroupCards);
  }

  function handleToggleEditGroupCard() {
    modalRef.current?.toggleModal();
    resetStates();
  }

  function handleEditGroupCard() {
    const newGroupCards = groupCards.map((groupCard) => {
      if (groupCard.id !== id) return groupCard;

      return {
        ...groupCard,
        title: titleToEdit || title,
        description: descriptionToEdit || description,
      };
    });

    setGroupCards(newGroupCards);
    modalRef.current?.toggleModal();
    resetStates();
  }

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function renderModalEditGroupCard() {
    function renderTitle() {
      return <Modal.Title title="Editar grupo de cards:" />;
    }

    function renderInputs() {
      return (
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
      );
    }

    function renderButtons() {
      return (
        <Modal.ContainerButton>
          <Modal.Button
            buttonTitle="Editar!"
            typeIcon="check"
            disabled={!titleToEdit && !descriptionToEdit}
            onClick={handleEditGroupCard}
          />

          <Modal.Button
            buttonTitle="Fechar!"
            typeIcon="close"
            onClick={handleToggleEditGroupCard}
          />
        </Modal.ContainerButton>
      );
    }

    return (
      <Modal.Container ref={modalRef} onToggleModal={() => resetStates()}>
        {renderTitle()}
        {renderInputs()}
        {renderButtons()}
      </Modal.Container>
    );
  }

  return (
    <Grid.Container onClick={handleNavigateToGroupCardPage}>
      <Grid.ContainerButton>
        <Grid.Button onClick={handleRemoveGroupCard} type="delete" />

        <Grid.Button onClick={handleToggleEditGroupCard} type="edit" />
      </Grid.ContainerButton>

      <Grid.ContainerDescription>
        <Grid.Title title={title} />
        {description && <Grid.Description description={description} />}
      </Grid.ContainerDescription>

      <Grid.Details details={`Quantidade de cards: ${cards.length}`} />

      {renderModalEditGroupCard()}
    </Grid.Container>
  );
};

export default GroupCard;
