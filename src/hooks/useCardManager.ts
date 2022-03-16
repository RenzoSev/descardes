import { useState } from 'react';
import { CardTypes, ContentChooseCard } from '../types/Cards';

function useCardManager() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState<CardTypes>('' as CardTypes);
  const [content, setContent] = useState<ContentChooseCard>(
    {} as ContentChooseCard
  );

  return {
    title,
    setTitle,
    question,
    setQuestion,
    answer,
    setAnswer,
    type,
    setType,
    content,
    setContent,
  };
}

export default useCardManager;
