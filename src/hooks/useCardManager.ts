import { useState } from 'react';
import { CardTypes, ContentChooseCard } from '../types/Cards';

function useCardManager() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState<CardTypes>('' as CardTypes);
  const [contentOption1, setContentOption1] = useState('');
  const [contentOption2, setContentOption2] = useState('');

  return {
    title,
    setTitle,
    question,
    setQuestion,
    answer,
    setAnswer,
    type,
    setType,
    contentOption1,
    setContentOption1,
    contentOption2,
    setContentOption2,
  };
}

export default useCardManager;
