import React, { useCallback, useRef } from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import { GroupCard as GroupCardTypes } from '../../types/Cards';
import {
  AiFillEdit,
  AiFillDelete,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';
import Modal, { ModalHandles } from '../Modal';
import useGroupCardsManager from '../../hooks/useGroupCardsManager';

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
  const modalRef = useRef<ModalHandles>(null);

  function handleRemoveGroupCard() {
    const cleanedGroupCards = groupCards.filter(
      (groupCard) => groupCard.id !== id
    );

    setGroupCards(cleanedGroupCards);
  }

  function handleToggleEditGroupCard() {
    modalRef.current?.toggleModal();
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
  }

  function renderModalEditGroupCard() {
    function renderTitle() {
      return (
        <span className="text-2xl font-bold uppercase text-blue-400">
          Editar grupo de cards:
        </span>
      );
    }

    function renderInputs() {
      return (
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 rounded">
            Título:
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg	border border-blue-200 py-1 px-2 outline-none transition-all focus:border-blue-400"
              maxLength={20}
              placeholder={title}
            />
          </label>

          <label className="flex flex-col gap-1 rounded">
            Descrição:
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg	border border-blue-200 py-1 px-2 outline-none transition-all focus:border-blue-400"
              placeholder={description}
              maxLength={20}
            />
          </label>
        </div>
      );
    }

    function renderButtons() {
      return (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleEditGroupCard}
            disabled={!titleToEdit && !descriptionToEdit}
            className="flex items-center justify-center gap-1 rounded-2xl border border-blue-700 py-2 px-4 font-bold uppercase text-blue-700 text-slate-100 transition-all disabled:opacity-50"
          >
            <AiFillCheckCircle />
            Editar!
          </button>

          <button
            onClick={handleToggleEditGroupCard}
            className='transition-all" flex items-center justify-center gap-1 rounded-2xl border border-red-700 py-2 px-4 font-bold uppercase text-red-700 text-slate-100'
          >
            <AiFillCloseCircle />
            Fechar!
          </button>
        </div>
      );
    }

    return (
      <Modal ref={modalRef}>
        {renderTitle()}
        {renderInputs()}
        {renderButtons()}
      </Modal>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-zinc-50 p-4 shadow">
      <div className="absolute right-0 flex flex-col gap-3">
        <button
          onClick={handleRemoveGroupCard}
          className="relative right-8 text-lg text-red-700"
        >
          <AiFillDelete />
        </button>

        <button
          onClick={handleToggleEditGroupCard}
          className="relative right-8 text-lg text-blue-700"
        >
          <AiFillEdit />
        </button>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-700">{title}</h3>
        {description && (
          <h4 className="text-normal text-slate-700">{description}</h4>
        )}
      </div>

      <p className="text-sm text-slate-700/50">
        Quantidade de cards: {cards.length}
      </p>

      {renderModalEditGroupCard()}
    </div>
  );
};

export default GroupCard;
