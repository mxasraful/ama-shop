import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import spinner from '../../../logo/ellipsis.svg';
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
                <div className="col-md-2 productsCategoriesFilterSection">
                    <div className="mt-5">
                        <div className="h4">Price</div>
                    </div>
                </div>
                <div className="col-md-10 row mt-4">
                    <br /><br />
                    <span className="h2 text-uppercase mb-3">{pdsCate}s</span>
                    {
                        pageLoader ?
                            <div className="productsByCategoriesLoader">
                                <div className="text-center mt-5">
                                    <img style={{width: "100px"}} src={spinner} alt="" className="img-fluid" />
                                </div>
                            </div>
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