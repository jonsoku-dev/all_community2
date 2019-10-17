import { CREATE_PRODUCT, PRODUCT_FAIL, GET_PRODUCT, GET_FILTERED_PRODUCTS, GET_SEARCHED_PRODUCTS } from '../Actions/types';

const initialState = {
  products: {},
  searchProducts: {},
  product: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SEARCHED_PRODUCTS:
      console.log(payload, 'GET_SEARCHED_PRODUCTS reducer payload');
      return {
        ...state,
        searchProducts: payload,
        loading: false,
      };
    case GET_FILTERED_PRODUCTS:
      console.log({ ...payload.data }, 'GET_FILTERED_PRODUCTS reducer payload');
      console.log({ ...state.products.data });
      return {
        ...state,
        products: payload,
        loading: false,
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
