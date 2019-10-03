import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Board from './Board';

const USER_LOGIN = true;

const AppRouter = () => {
  const authPage = () => (
    <Switch>
      <Route exact path="/" component={Main}></Route>
    </Switch>
  );
  const guestPage = () => (
    <Switch>
      <Route exact path="/" component={Board}></Route>
    </Switch>
  );

  return USER_LOGIN ? authPage() : guestPage();
};

export default AppRouter;
