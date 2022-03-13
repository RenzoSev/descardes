import { useContext } from 'react';
import { CardsContext } from '../store/CardsContext';

function useCardsContext() {
  const { group } = useContext(CardsContext);

  return { group };
}

export default useCardsContext;
