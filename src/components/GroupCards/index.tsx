import React from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import MainContainer from '../Container';
import Grid from '../Grid';
import Subtitle from '../Subtitle';
import CreateGroupCardButton from './CreateGroupCardButton';
import GroupCard from './GroupCard';

const GroupCards: React.FC = () => {
  const {
    group: { groupCards },
  } = useCardsContext();

  function renderGroupCards() {
    return (
      <Grid.MainContainer>
        {groupCards.map((groupCardProps) => (
          <GroupCard key={groupCardProps.id} {...groupCardProps} />
        ))}
      </Grid.MainContainer>
    );
  }

  return (
    <MainContainer>
      <Subtitle subtitle={'Grupo de cards'} />
      {renderGroupCards()}
      <CreateGroupCardButton />
    </MainContainer>
  );
};

export default GroupCards;
