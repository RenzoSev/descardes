export interface BaseCard {
  title: string;
  answer: string;
  question: string;
  content?: any;
}

export interface SideCard extends BaseCard {
  type: 'side';
}

export interface EssayCard extends BaseCard {
  type: 'essay';
}

export interface ChooseCard extends BaseCard {
  type: 'choose';
  content: {
    options: { title: string; isAnswer: true }[];
  };
}

export type Card = ChooseCard | SideCard | EssayCard;

export interface GroupCard {
  title: string;
  description?: string;
  cards: Card[];
}
