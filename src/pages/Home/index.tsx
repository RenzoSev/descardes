import React from 'react';
import useCardsContext from '../../hooks/useCardsContext';
import MainContainer from '../../components/Container';
import Grid from '../../components/Grid';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
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
    <>
      <Header title="Descardes" />

      <MainContainer>
        <Subtitle subtitle={'Grupo de cards'} />
        {renderGroupCards()}
        <CreateGroupCardButton />
      </MainContainer>
    </>
  );
};

export default GroupCards;
