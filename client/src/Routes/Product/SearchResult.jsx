import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SearchResult = ({ product: { searchProducts, loading } }) => {
  const renderSearchedProducts = () => {
    return !loading && searchProducts.data && searchProducts.data.map(product => <div key={product._id}>{product.name}</div>);
  };
  return <div>{renderSearchedProducts()}</div>;
};

SearchResult.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  {},
)(SearchResult);
