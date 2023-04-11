import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminProductItem from './AdminProductItem/AdminProductItem';

const AdminProducts = () => {

    const [productItems, setProductItems] = useState(null)
    const [getProductsLoading, setGetProductsLoading] = useState(true)
    const [getProductsError, setGetProductsError] = useState(false)

    // Handle Products 
    useEffect(() => {
        axios.get('/products')
            .then(products => {
                setProductItems(products.data)
                setGetProductsLoading(false)
                setGetProductsError(false)
            })
            .catch(error => {
                setProductItems(null)
                setGetProductsLoading(false)
                setGetProductsError(true)
            })
    }, [])



    return (
        <div className="admin-products-main">
            <div className="container mt-4">
                <h4>Products</h4>
                <ul class="nav justify-content-center admin-products-nav">
                    <div className="row mt-3 mb-4" >
                        <div className="text-center border-end" style={{ width: "200px" }}>
                            <h6>Total Products</h6>
                            <h3>{productItems ? productItems.length + 1 : "..."}</h3>
                        </div>
                        <div className="text-center border-end" style={{ width: "200px" }}>
                            <h6>Total Items</h6>
                            <h3>134</h3>
                        </div>
                        <div className="text-center border-end" style={{ width: "200px" }}>
                            <h6>Out Of Stock</h6>
                            <h3>22</h3>
                        </div>
                        <div className="text-center" style={{ width: "200px" }}>
                            <h6>Categories</h6>
                            <h3>8</h3>
                        </div>
                    </div>
                </ul>
                <div className="admin-products-container">
                    <div className="row">
                        <div className="col-md-3 mb-5">
                            <div className="card p-3">
                                <form class="row">
                                    <div class="col-9">
                                        <label htmlFor="adminProductSearchInput">Search Products</label>
                                        <input type="text" class="form-control form-control-sm w-100" id="adminProductSearchInput" placeholder="Produuct Name" />
                                    </div>
                                    <div class="col-3 pt-4" style={{ paddingLeft: "0px" }}>
                                        <button type="submit" class="btn btn-sm btn-primary mb-3">Search</button>
                                    </div>
                                </form>
                                <hr />
                                <div className="admin-product-filter-by-category pt-2">
                                    <span>By Category</span>
                                    <div class="form-check mt-3">
                                        <input class="form-check-input" type="checkbox" value="" id="adminProductFilterCategoryItemMobile" />
                                        <label class="form-check-label" for="adminProductFilterCategoryItemMobile">Mobile</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="adminProductFilterCategoryItemPc" />
                                        <label class="form-check-label" for="adminProductFilterCategoryItemPc">Pc</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="adminProductFilterCategoryItemLaptop" />
                                        <label class="form-check-label" for="adminProductFilterCategoryItemLaptop">Laptop</label>
                                    </div>
                                    <button className="btn btn-sm btn-primary px-3 mt-2">Filter</button>
                                </div>
                                <hr />
                                <div className="admin-product-filter-by-stock pt-2">
                                    <span>By Stock</span>
                                    <select class="form-select form-select-sm mt-2" aria-label="">
                                        <option selected>Select</option>
                                        <option value="1">In Stock</option>
                                        <option value="2">Out Of Stock</option>
                                        <option value="3">Upcommin</option>
                                    </select>
                                    <button className="btn btn-sm btn-primary px-3 mt-2">Filter</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 admin-product-items-row mb-5">
                            {
                                getProductsLoading ?
                                    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "250px" }}>
                                        <span>Loading...</span>
                                    </div>
                                    :
                                    <>
                                        {
                                            getProductsError ?
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <span>Got some error.</span>
                                                </div>
                                                :
                                                <>
                                                    <div class="list-group">
                                                        <div class="list-group-item list-group-item-action active" aria-current="true">
                                                            <div class="row">
                                                                <h6 class="col-1">Img</h6>
                                                                <h6 class="col-4">Product Name</h6>
                                                                <h6 class="col-1">Category</h6>
                                                                <h6 class="col-1">Prices</h6>
                                                                <h6 class="col-1">Status</h6>
                                                                <h6 class="col-1">Inventory</h6>
                                                                <h6 class="col-3 text-center">Actions</h6>
                                                            </div>
                                                        </div>
                                                        {
                                                            productItems &&
                                                            <>
                                                                {
                                                                    productItems?.map(item => (
                                                                        <AdminProductItem item={item}/>
                                                                    ))
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;