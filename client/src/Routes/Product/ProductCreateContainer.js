import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProduct } from '../../Store/Actions/product';
import { getCategories } from '../../Store/Actions/category';

const ProductCreateContainer = ({
  history,
  createProduct,
  getCategories,
  category: { loading, categories },
}) => {
  useEffect(() => {
    getCategories();
  }, []);

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    shipping: '',
    quantity: '',
    photo: null,
  });

  const { name, description, price, category, shipping, quantity, photo } = values;

  const handleInput = e => {
    switch (e.target.name) {
      case 'photo':
        setValues({ ...values, photo: e.target.files[0] });
        break;
      default:
        setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('price', price);
    form.append('category', category);
    form.append('shipping', shipping);
    form.append('quantity', quantity);
    form.append('photo', photo);
    createProduct(form, history);
  };

  const newProductForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        <h4>Post photo</h4>
        <label htmlFor="">
          <input type="file" name="photo" accept="image/*" onChange={handleInput} />
        </label>
      </div>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={e => handleInput(e)} value={name} />
      </div>
      <div>
        <label htmlFor="">description</label>
        <input type="text" name="description" onChange={e => handleInput(e)} value={description} />
      </div>
      <div>
        <label htmlFor="">price</label>
        <input type="text" name="price" onChange={e => handleInput(e)} value={price} />
      </div>
      <div>
        <label htmlFor="">Category</label>
        <select name="category" onChange={e => handleInput(e)} value={category}>
          {categories.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">shipping</label>
        <select name="shipping" onChange={e => handleInput(e)} value={shipping}>
          <option value="0">No</option>
          <option value="1">YES</option>
        </select>
      </div>
      <div>
        <label htmlFor="">quantity</label>
        <input type="number" name="quantity" onChange={e => handleInput(e)} value={quantity} />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );

  return <div>{newProductForm()}</div>;
};

ProductCreateContainer.propTypes = {};

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(
  mapStateToProps,
  { createProduct, getCategories },
)(withRouter(ProductCreateContainer));
