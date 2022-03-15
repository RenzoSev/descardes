import React from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import CreateGroupCardButton from './CreateGroupCardButton';
import GroupCard from './GroupCard';

const GroupCards: React.FC = () => {
  const {
    group: { groupCards },
  } = useCardsContext();

  function renderGroupCards() {
    return (
      <div className="flex flex-col gap-4">
        {groupCards.map((groupCardProps) => (
          <GroupCard key={groupCardProps.id} {...groupCardProps} />
        ))}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-8 px-4 py-8">
      <h2 className="uppercase text-center text-2xl font-bold text-slate-700">
        Grupo de Cards
      </h2>

      {renderGroupCards()}

      <CreateGroupCardButton />
    </section>
  );
};

export default GroupCards;
