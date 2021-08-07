import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import AddProduct from './AddProduct';
import EditProduct from "./EditProduct";

function AdminPage() {
    const [ products, setProducts ] = useState([]);
    const [ selectedProduct, setSelectedProduct ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const [ addModal, setAddModal ] = useState(false);
    const [ editModal, setEditModal ] = useState(false);

    useEffect(() => {
        // Instead of Axios, we'll use "fetch" here for demo purposes
        fetch("https://www.farmersph.com/addons/demo/api/v1/products")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
                setLoading(false);
            }
        );
    }, []);

    function editProduct(item) {
        setSelectedProduct(item);
        setEditModal(true);
    }

    const handleDataChange = (data) => {
        setProducts(data);
    }

    const addProduct = () => {
        setAddModal(true);
    }

    async function deleteProduct(item) {
        setLoading(true);

        const url = `https://www.farmersph.com/addons/demo/api/v1/product/${item.id}/delete`;
        axios({
            method: 'GET',
            url: url
        })
        .then(function(res) {
            const newProducts = products.filter(product => product.id !== item.id);
            setProducts(newProducts);

            console.log(res);
        })
        .catch(function(res) {
            console.log(res);
        });

        setLoading(false);
    }

    return (
        <React.Fragment>
        <header>
            <div className="header">
                <h1>Hardware Store</h1>
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
            <AddProduct show={addModal} setShow={setAddModal} data={products} handleDataChange={handleDataChange} />
            <EditProduct show={editModal} setShow={setEditModal} product={selectedProduct} handleDataChange={handleDataChange} />

            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <h1>Products</h1>
                        </div>
                        <div className="col-md-6 col-12 align-right">
                            <button className="btn add-product" onClick={() => addProduct()}>Create Product</button>
                        </div>
                    </div>
                    {loading && <div className="align-center"><Spinner animation="border" variant="primary" /></div>}
                    <table className="w-100 table table-bordered">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.product}</td>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}

export default AdminPage;
