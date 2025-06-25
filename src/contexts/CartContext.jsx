import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice:
            state.totalPrice + action.payload.price * action.payload.quantity,
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice:
            state.totalPrice + action.payload.price * action.payload.quantity,
        };
      }
    }

    case "REMOVE_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (!existingItem) return state;

      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        items: filteredItems,
        totalItems: state.totalItems - existingItem.quantity,
        totalPrice:
          state.totalPrice - existingItem.price * existingItem.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex === -1) return state;

      const item = state.items[existingItemIndex];
      const quantityDiff = quantity - item.quantity;

      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = { ...item, quantity };

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + item.price * quantityDiff,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        Object.keys(cartReducer(initialState, { type: "" })).forEach((key) => {
          if (!(key in parsedCart)) {
            throw new Error("Invalid cart data structure");
          }
        });
        dispatch({ type: "RESTORE_CART", payload: parsedCart });
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
