import React, { createContext, Dispatch, SetStateAction } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { GroupCard } from '../types/Cards';

interface CardContextType {
  group: {
    groupCards: GroupCard[];
    setGroupCards: React.Dispatch<React.SetStateAction<GroupCard[]>>;
  };
}

export const CardsContext = createContext({} as CardContextType);

export const CardsProvider: React.FC = ({ children }) => {
  const [groupCards, setGroupCards] = useLocalStorage<GroupCard[]>(
    'group-cards',
    []
  );

  return (
    <CardsContext.Provider value={{ group: { groupCards, setGroupCards } }}>
      {children}
    </CardsContext.Provider>
  );
};
