import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CardsProvider } from './store/CardsContext';
import Routes from './router/index.routes';

const App: React.FC = () => {
  return (
    <CardsProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </CardsProvider>
  );
};

export default App;
