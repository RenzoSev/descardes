import React from 'react';
import { useParams } from 'react-router-dom';
import MainContainer from '../../components/Container';
import Grid from '../../components/Grid';
import Header from '../../components/Header';
import Subtitle from '../../components/Subtitle';
import useCardsContext from '../../hooks/useCardsContext';
import { GroupCard } from '../../types/Cards';
import ContentCard from './ContentCard';
import CreateCardButton from './CreateCardButton';

const GroupCards: React.FC = () => {
  const { id: idParams } = useParams();
  const {
    group: { groupCards },
  } = useCardsContext();

  const { title, description, id, cards } = groupCards.find(
    (groupCard) => groupCard.id === Number(idParams)
  ) as GroupCard;

  function renderGroupCards() {
    return (
      <Grid.MainContainer>
        {cards.map((card) => (
          <ContentCard key={card.id} {...card} groupId={id}/>
        ))}
      </Grid.MainContainer>
    );
  }

  return (
    <>
      <Header title={title} subtitle={description} />
      <MainContainer>
        <Subtitle subtitle={'Cards'} />
        {renderGroupCards()}
        <CreateCardButton groupCardId={id} />
      </MainContainer>
    </>
  );
};

export default GroupCards;
