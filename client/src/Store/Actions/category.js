import axios from 'axios';
import { CREATE_CATEGORY, GET_CATEGORIES, CATEGORY_FAIL, GET_CATEGORY, PUT_CATEGORY, DELETE_CATEGORY } from './types';
import { setAlert } from './alert';

export const createCategory = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('http://localhost:4000/api/category', formData, config);
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert(`${formData.name}가 생성되었습니다. `));
    // history.push('/categories');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:4000/api/category');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCategory = categoryId => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:4000/api/category/${categoryId}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const putCategory = (categoryId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`http://localhost:4000/api/category/${categoryId}`, formData, config);
    dispatch({
      type: PUT_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert(`${formData.name}로 수정되었습니다. `));
  } catch (err) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteCategory = categoryId => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:4000/api/category/${categoryId}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
