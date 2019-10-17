import {
  CREATE_PRODUCT,
  PRODUCT_FAIL,
  GET_PRODUCT,
  GET_FILTERED_PRODUCTS,
  GET_SEARCHED_PRODUCTS,
  GET_RELATED_PRODUCTS,
} from '../Actions/types';

const initialState = {
  products: {},
  searchProducts: {},
  product: null,
  loading: true,
  relatedLoading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case GET_RELATED_PRODUCTS:
      console.log(payload, 'GET_RELATED_PRODUCTS reducer payload');
      return {
        ...state,
        relatedLoading: false,
        products: payload,
      };
    case GET_SEARCHED_PRODUCTS:
      console.log(payload, 'GET_SEARCHED_PRODUCTS reducer payload');
      return {
        ...state,
        loading: false,
        searchProducts: payload,
      };
    case GET_FILTERED_PRODUCTS:
      console.log({ ...payload.data }, 'GET_FILTERED_PRODUCTS reducer payload');
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
