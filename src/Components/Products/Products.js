import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Product from './../Reusable/Product/Product';
import { Link } from 'react-router-dom';

const Products = ({ bannerProducts, mobileProducts, laptopProducts, bfpProduct }) => {

    return (
        <div className="container text-left">
            <div className="row bannerFeaturedProducts">
                {
                    bannerProducts?.map(dt =>
                        <div className="col-md-6">
                            <Product pd={dt} />
                        </div>
                    )
                }
            </div>
            <br />
            <div className="row productsMobile">
                <h2>Mobiles </h2><br />
                {
                    mobileProducts?.map(dt =>
                        <>
                            <div className="col-md-4">
                                <Product pd={dt} />
                            </div>
                        </>
                    )
                }
                <br />
                <Link style={{ width: "200px" }} to="/products/mobile/" className="btn btn-outline-success mb-4 categorizedViewingBtn">See All Mobiles <FontAwesomeIcon icon={faChevronRight} /></Link>
            </div>
            <br />
            <div className="row productsMobile text-center mx-4">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    {
                        bfpProduct &&
                        <Product pd={bfpProduct} />
                    }
                </div>
                <div className="col-md-1"></div>
            </div>
            <br />
            <div className="row productsMobile">
                <h2>Laptops </h2><br />
                {
                    laptopProducts?.map(dt =>
                        <div className="col-md-4">
                            <Product pd={dt} />
                        </div>
                    )
                }
                <br />
                <Link style={{ width: "200px" }} to="/products/laptop/" className="btn btn-outline-success mb-4 categorizedViewingBtn">See All Laptops <FontAwesomeIcon icon={faChevronRight} /></Link>
            </div>
        </div >
    );
};

export default Products;