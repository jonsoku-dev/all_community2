import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSearchProducts } from '../../Store/Actions/product';
import { getCategories } from '../../Store/Actions/category';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

const Search = ({ getCategories, getSearchProducts, category: { categories, loading }, product }) => {
  const [data, setData] = useState({
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = name => e => {
    setData({
      ...data,
      [name]: e.target.value,
      searched: false,
    });
  };

  const { search, category, searched, results } = data;

  const searchData = async () => {
    if (search) {
      try {
        const response = await getSearchProducts({
          search: search || undefined,
          category: category,
        });
        setData({ ...data, results: response, searched: true });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div>
        <div>
          <select onChange={handleChange('category')}>
            <option value="All">Pick Category</option>
            {!loading &&
              categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input type="search" onChange={handleChange('search')} placeholder="Search by Name" autoFocus />
        </div>
        <div>
          <input type="submit" value="search"></input>
        </div>
      </div>
    </form>
  );

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `found ${results.length} products`;
    } else if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <div>{searchMessage(searched, results)}</div>
        <div>
          {results.map(product => (
            <Card product={product} key={product._id}></Card>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div>{searchForm()}</div>
      <div>{searchedProducts(results.data)}</div>
    </div>
  );
};

Search.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  category: state.category,
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getCategories, getSearchProducts },
)(Search);
