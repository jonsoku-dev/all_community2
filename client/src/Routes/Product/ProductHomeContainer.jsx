import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import SearchResult from './SearchResult';
const ProductHomeContainer = props => {
  return (
    <div>
      <Search></Search>
      <SearchResult></SearchResult>
    </div>
  );
};

ProductHomeContainer.propTypes = {};

export default ProductHomeContainer;
