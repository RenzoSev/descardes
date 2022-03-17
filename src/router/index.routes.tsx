import { Routes as Switch, Route } from 'react-router-dom';
import GroupCards from '../pages/GroupdCards';
import Home from '../pages/Home';

function Routes() {
  return (
    <Switch>
      <Route path="/:id" element={<GroupCards />} />
      <Route path="/" element={<Home />} />
    </Switch>
  );
}

export default Routes;
