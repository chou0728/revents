import { createReducer } from '../../app/common/util/reducerUtil'
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants';
const initialState = {
  data: 42
};

//方法一 :使用reducerUtil
export const incrementCounter = (state, payload) => {
   return { ...state, data: state.data + 1 };
}

export const decrementCounter = (state, payload) => {
   return { ...state, data: state.data - 1 };
}

//方法二:使用switch

// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       //在redux中，store中的state是不可變的，但可以透過copy state後，再回傳copy版本處理過後的state
//       return { ...state, data: state.data + 1 };
//     case DECREMENT_COUNTER:
//       return { ...state, data: state.data - 1 };
//     default:
//       return state;
//   }
// };

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter 
});
