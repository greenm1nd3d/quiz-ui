import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    description: '',
    photo: '',
    price: 0
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const photoRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    fetch("http://farmersph.com/addons/tap/api/products")
      .then(res => res.json())
      .then(data => {
          setProducts(data);
        }
      )
  }, []);

  function editProduct(item) {
    setEditing(true);
    setSelectedProduct(item);
  }

  function handleInputChange(event) {
    return e => {
      setSelectedProduct({
        ...selectedProduct,
        [event]: e.target.value
      });
    };
  }

  async function updateProduct() {
    setLoading(true);
    setEditing(false);
    try {
      const item = selectedProduct;
      const url = `https://cors-anywhere.herokuapp.com/http://farmersph.com/addons/tap/api/product/${item.id}/update`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          description: item.description,
          photo: item.photo,
          price: item.price
        })
      }).then(res => res.json());

      if (response.status === 200) {
        fetch("http://farmersph.com/addons/tap/api/products")
          .then(res => res.json())
          .then(data => {
            setProducts(data);
          })
      } else {
        alert(response.message);
      }
    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  }

  function closeModal() {
    setEditing(false);
  }

  async function addProduct() {
    setLoading(true);
    try {
      const url = `https://cors-anywhere.herokuapp.com/http://farmersph.com/addons/tap/api/product/create`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Product ' + Math.floor((Math.random() * 10000) + 1),
          description: 'This is a test product created using the test app',
          photo: '',
          price: 123
        })
      }).then(res => res.json());

      if (response.status === 200) {
        fetch("http://farmersph.com/addons/tap/api/products")
          .then(res => res.json())
          .then(data => {
            setProducts(data);
          })
      } else {
        alert(response.message);
      }
    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function deleteProduct(item) {
    setLoading(true);
    try {
      const url = `https://cors-anywhere.herokuapp.com/http://farmersph.com/addons/tap/api/product/${item.id}/delete`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(res => res.json());

      if (response.status === 200) {
        fetch("http://farmersph.com/addons/tap/api/products")
          .then(res => res.json())
          .then(data => {
            setProducts(data);
          })
      } else {
        alert(response.message);
      }
    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
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
        <Modal show={editing} animation={false}>
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} onChange={handleInputChange('name')} value={selectedProduct.name || ''} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} ref={descriptionRef} onChange={handleInputChange('description')} value={selectedProduct.description || ''} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Photo</Form.Label>
                <Form.Control type="text" ref={photoRef} onChange={handleInputChange('photo')} value={selectedProduct.photo || ''} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" ref={priceRef} onChange={handleInputChange('price')} value={selectedProduct.price || 0} required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => updateProduct()}>Save Changes</Button>
            <Button variant="secondary" onClick={closeModal}>Close Form</Button>
          </Modal.Footer>
        </Modal>
        {loading && <div className="align-center"><Spinner animation="border" variant="primary" /></div>}
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-12">
                <h1>Products</h1>
              </div>
              <div className="col-md-6 col-12 align-right">
                <button className="btn add-product" onClick={() => addProduct()}>Add Product</button>
              </div>
            </div>
            <table className="w-100 table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Photo</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <thead>
                {products.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.photo}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn edit-product"
                        onClick={() => editProduct(item)}>
                        Edit
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="btn delete-product"
                        onClick={() => deleteProduct(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminPage;
