import { SET_ALERT, REMOVE_ALERT } from '../Actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      //payload가 배열에 감싸여 있으니 object형식으로 받아와야한다.
      return [...state, payload];
    case REMOVE_ALERT:
      //payload가 id여야한다.
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};
