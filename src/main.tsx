import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { CardsProvider } from './store/CardsContext';

ReactDOM.render(
  <React.StrictMode>
    <CardsProvider>
      <App />
    </CardsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
