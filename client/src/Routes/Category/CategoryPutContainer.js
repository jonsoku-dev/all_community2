import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategory, putCategory } from '../../Store/Actions/category';
import { connect } from 'react-redux';

const CategoryCreateContainer = ({
  match,
  category: { category, loading },
  getCategory,
  putCategory,
}) => {
  const categoryId = match.params.categoryId;
  useEffect(() => {
    getCategory(categoryId);
    setFormData({
      name: loading || !category.name ? '' : category.name,
    });
  }, [loading]);

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const handleSubmit = e => {
    e.preventDefault();
    putCategory(categoryId, formData);
    setFormData({
      ...formData,
      name: '',
    });
  };
  const handleInput = e => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };

  return (
    <div>
      <h1>put container</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <input type="text" onChange={e => handleInput(e)} value={name} name="name"></input>
          <label>Category name</label>
        </div>
        <div>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

CategoryCreateContainer.propTypes = {};

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(
  mapStateToProps,
  { getCategory, putCategory },
)(CategoryCreateContainer);
