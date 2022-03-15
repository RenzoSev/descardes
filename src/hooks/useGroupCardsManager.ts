import { useState } from 'react';

function useGroupCardsManager() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return {
    title,
    setTitle,
    description,
    setDescription,
  };
}

export default useGroupCardsManager;
