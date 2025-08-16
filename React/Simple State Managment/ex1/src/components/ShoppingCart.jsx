import { useReducer } from "react";

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems = [...state.items, { ...action.data, id: Date.now() }];
      return {
        ...state,
        items: newItems,
        total: state.total + action.data.price,
        itemCount: state.itemCount + 1,
      };
    }
    case "REMOVE_ITEM": {
      const removedItem = state.items.find(item => item.id === action.data);
      const newItems = state.items.filter(item => item.id !== action.data);
      return {
        ...state,
        items: newItems,
        total: state.total - removedItem.price,
        itemCount: state.itemCount - 1,
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { items, total, itemCount } = state;

  const addItem = (product) => dispatch({ type: "ADD_ITEM", data: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", data: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <div>
      <h2>
        Shopping Cart ({itemCount} items) - Total: ${total}
      </h2>
    </div>
  );
}

export default ShoppingCart;
