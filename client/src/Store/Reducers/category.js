import { CREATE_CATEGORY, CATEGORY_FAIL, GET_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY } from '../Actions/types';

const initialState = {
  categories: [],
  category: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_CATEGORY:
      console.log(payload);
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
