import { CardTypes } from '../types/Cards';

export function parseType(type: CardTypes) {
  const types = {
    essay: 'dissertativo',
    choose: 'múltipla escolha',
    side: 'frente e verso',
  };

  return types[type];
}
