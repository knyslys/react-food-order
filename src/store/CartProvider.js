import React, { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    let updatedItems;
    const itemId = state.items.findIndex((item) => item.id === action.id);

    const existingItem = state.items[itemId];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    if (existingItem.amount > 1) {
      console.log("jooo");
      const updatedItem = {
        ...existingItem,
        amount: parseInt(existingItem.amount) - 1,
      };

      updatedItems = [...state.items];
      updatedItems[itemId] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD_TO_CART", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  useEffect(() => {
    console.log(cartState);
  }, [cartState]);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
