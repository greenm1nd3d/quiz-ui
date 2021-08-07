import React, { useState, useReducer, useEffect } from "react";
import { productReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "./reducers";

import ProductContext from "./ProductContext";

function GlobalState(props) {
    const [products, setProducts] = useState([]);
    const [cartState, dispatch] = useReducer(productReducer, { cart: [], total: 0 });

    useEffect(() => {
        fetch("https://www.farmersph.com/addons/demo/api/v1/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            }
        )
    }, []);

    /*const reloadProducts = products => {
        dispatch({ type: RELOAD_PRODUCTS, products: products });
    };*/

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
                //reloadProducts: reloadProducts,
                addToCart: addToCart,
                removeFromCart: removeFromCart
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}

export default GlobalState;