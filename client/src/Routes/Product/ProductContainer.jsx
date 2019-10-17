import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProduct, getProductsRelated } from '../../Store/Actions/product';
import { connect } from 'react-redux';
import Card from './Card';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;
const Main = styled.div`
  grid-column: 1 / 7;
`;
const Related = styled.div`
  grid-column: 8 / -1;
`;

const ProductContainer = ({
  getProduct,
  getProductsRelated,
  match,
  product: { products, product, loading, relatedLoading },
}) => {
  useEffect(() => {
    getProduct(match.params.productId);
    getProductsRelated(match.params.productId);
  }, [match.params.productId]);
  console.log(products, 'productsproductsproductsproductsproducts related');

  const renderProduct = () => {
    return !loading && product && <Card product={product} showViewProductButton={false}></Card>;
  };

  const renderRelatedProducts = () => {
    return !relatedLoading && products && products.length > 0 ? (
      products.map(p => <Card product={p}></Card>)
    ) : (
      <div>연관된 물품이 없습니다.</div>
    );
  };

  return (
    <Wrapper>
      <Main>{renderProduct()}</Main>
      <Related>{renderRelatedProducts()}</Related>
    </Wrapper>
  );
};

ProductContainer.propTypes = {
  getProductsRelated: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getProduct, getProductsRelated },
)(ProductContainer);
