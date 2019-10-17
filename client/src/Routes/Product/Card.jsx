import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'react-moment';

const CardWrapper = styled.div`
  background-color: #3498db;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  > div {
    word-break: break-all;
  }
`;
const Photo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
`;
const Name = styled.div``;
const Description = styled.div``;
const Price = styled.div``;
const Category = styled.div``;
const CreatedAt = styled.div``;

const Button = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Card = ({
  history: { push },
  showViewProductButton = true,
  product: { _id, name, description, price, photo, category, createdAt, quantity },
}) => {
  const renderShowViewProductButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${_id}`}>
          <button>상품보기</button>
        </Link>
      )
    );
  };

  const renderShowAddCartButton = () => {
    return (
      <Link to={`/#`}>
        <button>장바구니</button>
      </Link>
    );
  };

  const renderShowStock = quantity => {
    return quantity > 0 ? <span>재고 있음</span> : <span>재고 없음</span>;
  };

  return (
    <CardWrapper>
      <Photo>
        <img src={`http://localhost:4000/${photo}`} alt="" />
      </Photo>
      <Name>{name}</Name>
      <Description>{description.substring(0, 40) + '...'}</Description>
      <Price>${price}</Price>
      <Category>{category.name}</Category>
      <CreatedAt>
        <Moment format="YYYY/MM/DD" date={createdAt}></Moment>
      </CreatedAt>
      {renderShowStock(quantity)}
      <Button>
        {renderShowViewProductButton(showViewProductButton)}
        {renderShowAddCartButton()}
      </Button>
    </CardWrapper>
  );
};

export default withRouter(Card);
