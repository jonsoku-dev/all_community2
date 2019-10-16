import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createCategory } from '../../Store/Actions/category';
import { connect } from 'react-redux';
import CategoryMainContainer from './CategoryMainContainer';

const CategoryCreateContainer = ({ createCategory, history }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const handleSubmit = e => {
    e.preventDefault();
    createCategory(formData, history);
    setFormData({
      ...formData,
      name: '',
    });
  };
  const handleInput = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <input type="text" onChange={e => handleInput(e)} value={name} name="name" autoFocus></input>
          <label>Category name</label>
        </div>
        <div>
          <input type="submit"></input>
        </div>
      </form>
      <CategoryMainContainer />
    </div>
  );
};

CategoryCreateContainer.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createCategory },
)(withRouter(CategoryCreateContainer));
