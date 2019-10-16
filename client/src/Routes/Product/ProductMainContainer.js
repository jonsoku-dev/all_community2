import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getCategories } from '../../Store/Actions/category';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
import { getFilteredProducts } from '../../Store/Actions/product';
import Card from './Card.jsx';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;
const LeftSideBar = styled.div`
  grid-column: 1 / 3;
`;
const Main = styled.div`
  grid-column: 3 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const ProductMainContainer = ({ getCategories, getFilteredProducts, category: { categories, loading }, product: { products } }) => {
  useEffect(() => {
    getCategories();
    getFilteredProducts(skip, limit, myFilters.filters);
  }, []);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResulted, setFilteredResulted] = useState({});

  const handleFilters = (filters, filterBy) => {
    // console.log('SHOP', filter, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResult(myFilters.filters);
    setMyFilters(newFilters);
  };

  const loadFilteredResult = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then(data => {
      setSize(data.size);
    });
    // setSize(products.data.size);
    // setSize(products.size);
    // setSkip(0);
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters);
    setFilteredResulted(products);
    setSize(products.data.size);
    setSkip(0);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  console.log(products, 'productmaincontainer');
  return (
    <Wrapper>
      <LeftSideBar>
        <h4>Filter by categories</h4>
        <ul>
          <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}></Checkbox>
        </ul>

        <h4>Filter by prices</h4>
        <ul>
          <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')}></RadioBox>
        </ul>
      </LeftSideBar>
      <Main>{!loading && products && products.data && products.data.map((product, i) => <Card key={i} product={product}></Card>)}</Main>
    </Wrapper>
  );
};

ProductMainContainer.propTypes = {
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  category: state.category,
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getCategories, getFilteredProducts },
)(ProductMainContainer);
