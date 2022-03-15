import React from 'react';
import GroupCards from '../components/GroupCards';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <>
      <Header title="Descardes" />
      <GroupCards />
    </>
  );
};

export default Home;
