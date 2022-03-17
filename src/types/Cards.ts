export type CardTypes = 'side' | 'essay' | 'choose';

export interface BaseCard {
  id: number;
  title: string;
  answer: string;
  question: string;
  content?: any;
  type: CardTypes;
}

export interface SideCard extends BaseCard {
  type: 'side';
}

export interface EssayCard extends BaseCard {
  type: 'essay';
}

export interface ContentChooseCard {
  options: { title: string }[];
}
export interface ChooseCard extends BaseCard {
  type: 'choose';
  content: ContentChooseCard;
}

export type Card = SideCard | EssayCard | ChooseCard;

export interface GroupCard {
  id: number;
  title: string;
  description?: string;
  cards: Card[];
}
