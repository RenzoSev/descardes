import React, { useState, useRef, useCallback } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import useCardsContext from '../../hooks/useCardsContext';
import Modal, { ModalHandles } from '../Modal';
import useGroupCardsManager from '../../hooks/useGroupCardsManager';

const CreateGroupCardButton: React.FC = () => {
  const modalRef = useRef<ModalHandles>(null);
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

  function renderModalCreateCard() {
    function renderTitle() {
      return (
        <span className="text-2xl font-bold uppercase text-blue-400">
          Criar grupo de cards:
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
            />
          </label>

          <label className="flex flex-col gap-1 rounded">
            Descrição:
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg	border border-blue-200 py-1 px-2 outline-none transition-all focus:border-blue-400"
              placeholder="Este campo é opcional."
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
            onClick={handleCreateGroupCard}
            disabled={!title}
            className="flex items-center justify-center gap-1 rounded-2xl border border-green-700 py-2 px-4 font-bold uppercase text-green-700 text-slate-100 transition-all disabled:opacity-50"
          >
            <AiFillCheckCircle />
            Feito!
          </button>

          <button
            onClick={handleShowModalGroupCard}
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
    <div className="fixed inset-x-0 bottom-4 flex justify-center">
      {renderModalCreateCard()}

      <button
        className="flex items-center justify-center gap-1 rounded-2xl bg-blue-700 py-2 px-4 font-bold uppercase text-slate-100"
        onClick={handleShowModalGroupCard}
      >
        <RiAddCircleFill />
        Criar grupo de card
      </button>
    </div>
  );
};

export default CreateGroupCardButton;
