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
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false,
      };
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
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(c => c._id !== payload),
        loading: false,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
