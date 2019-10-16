import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories, createCategory, deleteCategory } from '../../Store/Actions/category';
import { connect } from 'react-redux';
import styled from 'styled-components';

const CategoryCard = styled.div`
  display: flex;
`;
const DeleteBtn = styled.button`
  margin-left: 1rem;
`;

const CategoryContainer = ({ history, getCategories, createCategory, deleteCategory, category: { categories, loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [values, setValues] = useState({
    name: '',
  });

  const { name } = values;

  const handleInput = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    createCategory(values, history).then(setValues({ ...values, name: '' }));
  };

  const renderCreateForm = () => (
    <form onSubmit={e => handleSubmit(e)}>
      <div>
        <input type="text" onChange={e => handleInput(e)} value={name} name="name" autoFocus></input>
        <label>Category name</label>
      </div>
      <div>
        <input type="submit"></input>
      </div>
    </form>
  );

  const renderCategories = () => {
    return categories.map(c => (
      <CategoryCard key={c._id}>
        <div>{c.name}</div>
        <div>
          <DeleteBtn onClick={() => deleteCategory(c._id)}>삭제</DeleteBtn>
        </div>
      </CategoryCard>
    ));
  };

  console.log(categories);
  return (
    <>
      {renderCreateForm()}
      {renderCategories()}
    </>
  );
};

CategoryContainer.propTypes = {
  getCategories: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(
  mapStateToProps,
  { getCategories, createCategory, deleteCategory },
)(CategoryContainer);
