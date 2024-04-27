import { createContext, useReducer } from 'react';

export const initContext = {
  items: [],
  addItem: (item) => {},
  removeItem: (itemId) => {},
  clearCart: () => {},
};

const CartContext = createContext(initContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const updatedItems = [...state.items];
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };

    case 'REMOVE_ITEM':
      const existingCartItemIndexToRemove = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItemsRemove = [...state.items];
      const existingCartItem =
        updatedItemsRemove[existingCartItemIndexToRemove];
      if (existingCartItem.quantity === 1) {
        updatedItemsRemove.splice(existingCartItemIndexToRemove, 1);
        return {
          ...state,
          items: updatedItemsRemove,
        };
      }

      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItemsRemove[existingCartItemIndexToRemove] = updatedItem;
      return {
        ...state,
        items: [...updatedItemsRemove],
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return { ...state };
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const removeItem = (item) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', item });
  };

  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
  };

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
