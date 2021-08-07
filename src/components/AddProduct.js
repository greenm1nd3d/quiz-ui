import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import axios from 'axios';

const AddProduct = (props) => {
    const { show, setShow, handleDataChange } = props;
    const [ selectedFile, setSelectedFile ] = useState('');
    const [ isSelected, setIsSelected ] = useState(false);

    const handleClose = () => setShow(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
    };

    async function createProduct(item) {
        let data = new FormData();
        data.append('sku', item.sku);
        data.append('product', item.product);
        data.append('content', item.content);
        data.append('photo', selectedFile);
        data.append('price', item.price);

        const url = `https://www.farmersph.com/addons/demo/api/v1/product`;
        axios({
            method: 'POST',
            url: url,
            data: data,
        })
        .then(function(res) {
            console.log(res);

            fetch("https://www.farmersph.com/addons/demo/api/v1/products")
            .then(res => res.json())
                .then(data => {
                    handleDataChange(data);
                }
            );
        })
        .catch(function(res) {
            console.log(res);
        });

        setShow(false);
    }

    return (
        <Modal show={show} animation={false}>
            <Modal.Header>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <Formik
                            initialValues={{
                                sku: '',
                                product: '',
                                content: '',
                                photo: {},
                                price: ''
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.sku) {
                                    errors.sku = 'Product SKU is rquired';
                                }
                                if (!values.product) {
                                    errors.product = 'Product name is required';
                                }
                                if (!values.content) {
                                    errors.content = 'Product description is required';
                                }
                                if (!values.photo) {
                                    errors.photo = 'Product photo is required';
                                }
                                if (!values.price) {
                                    errors.price = 'Product price is required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    createProduct(values);
                                    setSubmitting(false);
                                }, 300);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <Form>
                                    { isSubmitting ? (
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="align-center"><Spinner animation="border" variant="primary" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="container">
                                            <div className="row mb-15">
                                                <div className="col-md-12">
                                                    <label htmlFor="sku">Product SKU</label>
                                                    <Field type="text" name="sku" className="full-width p-5-10" />
                                                    <ErrorMessage name="sku" component="div" className="error" />
                                                </div>
                                            </div>
                                            <div className="row mb-15">
                                                <div className="col-md-12">
                                                    <label htmlFor="product">Product Name</label>
                                                    <Field type="text" name="product" className="full-width p-5-10" />
                                                    <ErrorMessage name="product" component="div" className="error" />
                                                </div>
                                            </div>
                                            <div className="row mb-15">
                                                <div className="col-md-12">
                                                    <label htmlFor="content">Product Description</label>
                                                    <Field component="textarea" rows="3" name="content" className="full-width p-5-10" />
                                                    <ErrorMessage name="content" component="div" className="error" />
                                                </div>
                                            </div>
                                            <div className="row mb-15">
                                                <div className="col-md-12">
                                                    <label htmlFor="photo">Product Photo</label>
                                                    <input type="file" name="photo" id="photo" onChange={changeHandler} className="full-width p-5-10" />
                                                    <ErrorMessage name="photo" component="div" className="error" />
                                                </div>
                                            </div>
                                            <div className="row mb-15">
                                                <div className="col-md-12">
                                                    <label htmlFor="price">Price</label>
                                                    <Field type="text" name="price" className="full-width p-5-10" />
                                                    <ErrorMessage name="price" component="div" className="error" />
                                                </div>
                                            </div>
                                            <div className="row mb-15">
                                                <div className="col-md-12">
                                                    <button type="submit" disabled={isSubmitting} className="btn edit-product">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="col-md-6">
                        {
                            isSelected ? (
                                <img src={URL.createObjectURL(selectedFile)} alt="" className="photo" />
                            ) : null
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outlined" onClick={handleClose}>Close Form</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProduct;