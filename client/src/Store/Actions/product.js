import axios from 'axios';
import queryString from 'query-string';
import { setAlert } from './alert';
import {
  PRODUCT_FAIL,
  CREATE_PRODUCT,
  GET_PRODUCT,
  GET_FILTERED_PRODUCTS,
  GET_SEARCHED_PRODUCTS,
  GET_RELATED_PRODUCTS,
} from './types';

export const createProduct = (form, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const res = await axios.post('http://localhost:4000/api/product', form, config);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert('Product 가 생성되었습니다. ', 'success'));
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProduct = productId => async dispatch => {
  console.log(productId);
  try {
    const res = await axios.get(`http://localhost:4000/api/product/${productId}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFilteredProducts = (skip, limit, filters = {}) => async dispatch => {
  const data = { limit, skip, filters };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`http://localhost:4000/api/product/by/search`, data, config);
    await dispatch({
      type: GET_FILTERED_PRODUCTS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSearchProducts = params => async dispatch => {
  const query = queryString.stringify(params);
  try {
    const res = await axios.post(`http://localhost:4000/api/product/search?${query}`);
    dispatch({
      type: GET_SEARCHED_PRODUCTS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProductsRelated = productId => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:4000/api/product/related/${productId}`);
    dispatch({
      type: GET_RELATED_PRODUCTS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
