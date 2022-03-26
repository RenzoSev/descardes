import { Routes as Switch, Route } from 'react-router-dom';
import Card from '../pages/Card';
import GroupCards from '../pages/GroupdCards';
import Home from '../pages/Home';

function Routes() {
  return (
    <Switch>
      <Route path="/:id" element={<GroupCards />} />
      <Route path="/" element={<Home />} />
      <Route path="/:groupId/:cardId" element={<Card />} />
    </Switch>
  );
}

export default Routes;
