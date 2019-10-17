import React, { useEffect } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyleComponent from '../Styles/GlobalStyle';
import GlobalNavigation from './layout/GlobalNavigation';
import styled, { ThemeProvider } from 'styled-components';
// Style
import Theme from '../Styles/Theme';
// Global Layouts
import GlobalAlert from './layout/GlobalAlert';
// Utils
import setAuthToken from '../util/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import { loadUser } from '../Store/Actions/auth';
import store from '../Store/index';
// Routes
import { MainContainer } from '../Routes/Main';
import { LoginContainer } from '../Routes/Login';
import { SignupContainer } from '../Routes/Signup';
import { PostContainer } from '../Routes/Post';
import { CategoryContainer, CategoryPutContainer } from '../Routes/Category';
import { ProductHomeContainer, ProductCreateContainer, ProductFilterContainer } from '../Routes/Product';
import { AdminContainer } from '../Routes/Admin';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyleComponent></GlobalStyleComponent>
        <Router>
          <Container>
            <GlobalNavigation />
            <GlobalAlert />
            <Switch>
              <Route exact path="/" component={MainContainer}></Route>
              <Route exact path="/login" component={LoginContainer}></Route>
              <Route exact path="/signup" component={SignupContainer}></Route>
              <Route exact path="/post" component={PostContainer}></Route>
              <Route exact path="/category" component={CategoryContainer}></Route>
              <Route exact path="/category/:categoryId" component={CategoryPutContainer}></Route>
              <Route exact path="/product" component={ProductHomeContainer}></Route>
              <Route exact path="/product/filter" component={ProductFilterContainer}></Route>
              <Route exact path="/product/create" component={ProductCreateContainer}></Route>
              <Route path="/admin" component={AdminContainer}></Route>
              <Redirect from="*" to="/" />
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
