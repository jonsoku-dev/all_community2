import { CREATE_PRODUCT, PRODUCT_FAIL, GET_PRODUCT, GET_FILTERED_PRODUCTS } from '../Actions/types';

const initialState = {
  products: {},
  product: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FILTERED_PRODUCTS:
      console.log(payload, 'payload');
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
