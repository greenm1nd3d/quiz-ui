import React, { useState, useReducer, useEffect } from "react";
import { productReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "./reducers";

import ProductContext from "./ProductContext";

function GlobalState(props) {
  const [products, setProducts] = useState([]);
  const [cartState, dispatch] = useReducer(productReducer, { cart: [], total: 0 });

  useEffect(() => {
    fetch("http://farmersph.com/addons/tap/api/products")
      .then(res => res.json())
      .then(data => {
          setProducts(data);
        }
      )
  }, []);

  const addToCart = product => {
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const removeFromCart = productId => {
    dispatch({ type: REMOVE_PRODUCT, productId: productId });
  };

  return (
    <ProductContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        total: cartState.total,
        addToCart: addToCart,
        removeFromCart: removeFromCart
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default GlobalState;
