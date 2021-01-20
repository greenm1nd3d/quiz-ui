import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

import Products from "../data/Products";
import ProductContext from "../contexts/ProductContext";

function ProductsPage(props) {
  const { products, removeFromCart } = useContext(ProductContext);
  const [items, setItems] = useState(products);

  useEffect(() => {
    if (items.length === 0) {
      setItems(products);
    }
  }, [items.length, products]);

  function searchProducts(e) {
    let string = e.target.value;
    let result = [];
    if (string.length > 2) {
      result = products.filter((item) => typeof item.name === 'string' && item.name.toLowerCase().indexOf(string) > -1);
    } else {
      result = products;
    }
    setItems(result);
  }

  return (
    <ProductContext.Consumer>
      {context => (
        <React.Fragment>
          <header>
            <div className="header">
              <h1>Ace Hardware</h1>
            </div>
            <nav className="top-menu">
              <ul>
                <li>
                  <NavLink to="/">Shop</NavLink>
                </li>
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-12 col-12">
                <div className="row">
                  <div className="col-md-12">
                    <h1>Products</h1>


                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="Search for a product..."
                        onChange={e => searchProducts(e)}
                      />
                    </div>

                    <Products products={items} />

                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12-col-12">
                <div className="row cart">
                  <div className="col-md-12">
                    <h3>Shopping Cart</h3>
                    {context.cart.length <= 0 && <p>Your shopping cart is empty.</p>}
                    <ul>
                      {context.cart.map(cartItem => (
                        <li key={cartItem.id}>
                          <div className="row">
                            <div className="col-md-12">
                              <img src={cartItem.photo} className="photo" alt={cartItem.name} />
                              <span className="name">{cartItem.name} {cartItem.quantity > 1 ? '(' + cartItem.quantity + ' pcs)' : '' }</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-12">
                              <span>Sub-Total: kr {cartItem.quantity * cartItem.price}</span>
                            </div>
                            <div className="col-lg-6 col-md-12">
                              <button className="btn remove-from-cart"
                                onClick={removeFromCart.bind(
                                  this,
                                  cartItem.id
                                )}
                              >
                                Remove from Cart
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {context.cart.length > 0 && <div className="cart-total">Cart Total: kr {context.total}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </ProductContext.Consumer>
  )
}

export default ProductsPage;
