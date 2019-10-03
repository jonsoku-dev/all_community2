import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyleComponent from '../Styles/GlobalStyle';
import AppRouter from '../Routes/AppRouter';

const App = () => (
  <>
    <GlobalStyleComponent></GlobalStyleComponent>
    <Router>
      <AppRouter></AppRouter>
    </Router>
  </>
);

export default App;
