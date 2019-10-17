import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background-color: #3498db;
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

const Card = ({ product: { name, description, price, photo } }) => {
  return (
    <CardWrapper>
      <Photo>
        <img src={`http://localhost:4000/${photo}`} alt="" />
      </Photo>
      <Name>{name}</Name>
      <Description>{description.substring(0, 40) + '...'}</Description>
      <Price>${price}</Price>
    </CardWrapper>
  );
};

export default Card;
