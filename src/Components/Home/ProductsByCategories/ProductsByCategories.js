import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../../Reusable/Loader/Loader';
import Product from '../../Reusable/Product/Product';

const ProductsByCategories = () => {

    const [pdsData, setPdsData] = useState(null)

    const [pageLoader, setPageLoader] = useState(true)

    const { pdsCate } = useParams()

    useEffect(() => {
        axios(`/products/${pdsCate}`)
            .then(res => {
                const data = res.data
                setPdsData(data)
                setPageLoader(false)
            })
    }, [pdsCate])


    return (
        <div className="productsByCategoriesMain container">
            <div className="fluid-row d-flex ms-3">
                <div className="col-md-2 productsCategoriesFilterSectionp pe-3">
                    <div className="mt-5">
                        <h5>SHOP BY</h5>                        
                        <div className="productFilterByCategoriesSection mt-5">
                            <h6>Categories</h6>
                            <form action="" className="productFilterByCategoriesSectionForm">
                                <Link to='/products/mobile' class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandMobile" checked={pdsCate === "mobile"} />
                                    <label class="form-check-label" for="filterBrandMobile">Mobile</label>
                                </Link>
                                <Link to='/products/laptop' class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandLaptop" checked={pdsCate === "laptop"} />
                                    <label class="form-check-label" for="filterBrandLaptop">Laptop</label>
                                </Link>
                                <Link to='/products/pc' class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandPc" checked={pdsCate === "pc"} />
                                    <label class="form-check-label" for="filterBrandPc">Pc</label>
                                </Link>
                                <Link to='/products/monitor' class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandMonitor" checked={pdsCate === "monitor"} />
                                    <label class="form-check-label" for="filterBrandMonitor">Monitor</label>
                                </Link>
                                <br /><br />
                            </form>
                        </div>
                        <div className="productFilterByBrandSection mt-4">
                            <h6>Brand</h6>
                            <form action="" className="productFilterByBrandSectionForm">
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandSamsung" />
                                    <label class="form-check-label" for="filterBrandSamsung">Samsung</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandApple" />
                                    <label class="form-check-label" for="filterBrandApple">Apple</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandXiaomi" />
                                    <label class="form-check-label" for="filterBrandXiaomi">Xiaomi</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandHuawei" />
                                    <label class="form-check-label" for="filterBrandHuawei">Huawei</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandOppo" />
                                    <label class="form-check-label" for="filterBrandOppo">Oppo</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandOneplus" />
                                    <label class="form-check-label" for="filterBrandOneplus">Oneplus</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input filterBrandItem" type="checkbox" value="" id="filterBrandRealme" />
                                    <label class="form-check-label" for="filterBrandRealme">Realme</label>
                                </div>
                            </form>
                        </div>
                        <div className="productFilterByPriceSection mt-4 pb-4">
                            <h6>Price</h6>
                            <form action="" className="productFilterByPriceSectionForm">
                                <div className="d-flex">
                                    <div className='me-1'>
                                        <label htmlFor="filteredByPriseStart">Start</label>
                                        <input type="number" id='filteredByPriseStart' className="signInInput filterPriseStart" placeholder='1000 ৳' />
                                    </div>
                                    <div>
                                        <label htmlFor="filteredByPriseEnd">End</label>
                                        <input type="number" id='filteredByPriseEnd' className="signInInput filterPriseEnd" placeholder='20000 ৳' />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <button className="btn btn-sm mt-3 ms-auto button">Apply</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 row mt-4">
                    <br /><br />
                    <span className="h5 text-uppercase mb-3">{pdsCate}s</span>
                    {
                        pageLoader ?
                            <Loader />
                            :
                            <>
                                {
                                    pdsData?.map(dt =>
                                        <div className="col-md-4">
                                            <Product pd={dt} />
                                        </div>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsByCategories;