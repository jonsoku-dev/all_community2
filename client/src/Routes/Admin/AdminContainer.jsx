import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryContainer } from '../Category';
import { ProductCreateContainer } from '../Product';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;
const LeftSideBar = styled.div`
  grid-column: 1 / 2;
`;
const Main = styled.div`
  grid-column: 2 / -1;
`;

const AdminContainer = props => {
  return (
    <Wrapper>
      <LeftSideBar>
        <ul>
          <li>
            <Link to="/admin/category">Category</Link>
          </li>
          <li>
            <Link to="/admin/product">Product</Link>
          </li>
        </ul>
      </LeftSideBar>
      <Main>
        <Switch>
          <Route path="/admin" exact render={() => <div>유저를 선택해주세요.</div>} />
          <Route path="/admin/category" exact render={() => <CategoryContainer></CategoryContainer>} />
          <Route path="/admin/product" exact render={() => <ProductCreateContainer></ProductCreateContainer>} />
        </Switch>
      </Main>
    </Wrapper>
  );
};

export default AdminContainer;
