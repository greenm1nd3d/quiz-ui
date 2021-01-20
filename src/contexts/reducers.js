export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const addToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  let totalPrice = 0;
  totalPrice = updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return { ...state, cart: updatedCart, total: totalPrice };
};

const removeFromCart = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  let totalPrice = 0;
  totalPrice = updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return { ...state, cart: updatedCart, total: totalPrice };
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addToCart(action.product, state);

    case REMOVE_PRODUCT:
      return removeFromCart(action.productId, state);

    default:
      return state;
  }
};
