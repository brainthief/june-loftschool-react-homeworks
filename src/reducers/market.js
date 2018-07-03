import { CREATE_ORDER, MOVE_ORDER_TO_FARM } from '../actions/marketTypes';
import { sortOrderFn } from '../reducers/helpers';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload].sort(sortOrderFn)
      };

    case MOVE_ORDER_TO_FARM:
      const orderId = action.payload.id;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);

      if (orderIndex === -1) return;

      return {
        ...state,
        orders: [
          ...state.orders.slice(0, orderIndex),
          ...state.orders.slice(orderIndex + 1)
        ]
      };

    default:
      return state;
  }
};
