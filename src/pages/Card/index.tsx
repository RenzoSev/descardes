import ChooseCard from './ChooseCard';
import EssayCard from './EssayCard';
import SideCard from './SideCard';
import useCardsContext from '../../hooks/useCardsContext';
import { useParams } from 'react-router-dom';
import { Card as CardTypes } from '../../types/Cards';

const Card: React.FC = () => {
  const { groupId, cardId } = useParams();
  const {
    group: { groupCards },
  } = useCardsContext();

  const card = groupCards
    .find((groupCard) => groupCard.id === Number(groupId))
    ?.cards.find((card) => card.id === Number(cardId)) as CardTypes;

  if (card.type === 'side') {
    return <SideCard {...card} />;
  }

  if (card.type === 'choose') {
    return <ChooseCard {...card} />;
  }

  return <EssayCard {...card} />;
};

export default Card;
