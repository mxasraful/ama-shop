import { faMinus, faPlus, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../Reusable/Loader/Loader';
import { useStateValue } from '../StateProvider/StateProvider';
import './productDetails.css';

const ProductDetails = () => {

    const [pdDetails, setPdDetails] = useState(null)
    const [pdFImg, setPdFImg] = useState("")
    const [pdDetailLoader, setPdDetailLoader] = useState(true)
    const [pdVariant, setPdVariant] = useState(null)
    const [pdPrice, setPdPrice] = useState(null)
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)

    // Quantity value
    const [qty, setQty] = useState(1)

    // Get context api data
    const [, dispatch] = useStateValue()

    // Get params data
    const { pdCate } = useParams()
    const { pdId } = useParams()

    // Get data from database
    useEffect(() => {
        if (pdCate && pdId) {
            axios(`/product/${pdCate}/${pdId}`)
                .then(res => {
                    const data = res.data
                    setPdDetails(data)
                    setPdFImg(data.imgs[0])
                    setPdVariant(data.variant)
                    setPdPrice(data.price[0])
                    setPdDetailLoader(false)
                    setSelectedVariantIndex(0)
                })
        }
    }, [])

    // Set variant price in price state
    const setVariantDataInPrice = (variantDt) => {
        let variantIndex = pdVariant.indexOf(variantDt)
        setPdPrice(pdDetails.price[variantIndex])
        setSelectedVariantIndex(variantIndex)
    }

    // Add Cart Data in State
    const addToCart = () => {
        if (qty > 1) {
            dispatch({
                type: "ADD_TO_CART",
                item: {
                    id: pdDetails.id,
                    qty: qty,
                    category: pdDetails.category,
                    variant: selectedVariantIndex,
                    price: qty * pdPrice
                }
            })
        } else {
            dispatch({
                type: "ADD_TO_CART",
                item: {
                    id: pdDetails.id,
                    qty: qty,
                    category: pdDetails.category,
                    variant: selectedVariantIndex,
                    price: pdPrice
                }
            })
        }
    }

    document.title = `Asrafuls Amazon - ${pdDetails?.title} - Details`

    return (
        <>
            {
                pdDetailLoader ?
                    <Loader />
                    :
                    <>
                        <br />
                        <div className="productDetailsMain mb-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div style={{ alignItems: "center" }} className="pdDetailsImg card">
                                            <img src={pdFImg} alt="" className="img-fluid" />
                                        </div><br />
                                        <div className="pdDetailsImgsList row">
                                            {
                                                pdDetails.imgs?.map(dt =>
                                                    <div onClick={() => setPdFImg(dt)} className="card pdDetailsListImg">
                                                        <img className="img-fluid" src={dt} alt="" />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <h3 className="pdDetailTitle">{pdDetails?.title}</h3><br />
                                        <h4 className="mobilePdDetailTitle mb-2">{pdDetails?.title}</h4>
                                        <div className="">
                                            {
                                                pdDetails?.rating &&
                                                <div className="d-flex">
                                                    <div className="productOvRattingIn">
                                                        {
                                                            Array(pdDetails?.rating)?.fill()?.map(() => (
                                                                <FontAwesomeIcon icon={faStar} />
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="productOvRattingOut">
                                                        {
                                                            Array(5 - Array(pdDetails?.rating)?.fill().length).fill()?.map(() => (
                                                                <FontAwesomeIcon icon={faStar} />
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="mt-3 mb-2 d-flex">
                                            <div>
                                                Price: <strong className="h4" style={{ color: "#C45500" }}>
                                                    <span>$ {pdPrice}.98</span>
                                                </strong>
                                            </div>
                                            <div className="pdDetailsAddCartBtn ms-5">
                                                <Button onClick={addToCart} className="btn button"><span> <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</span></Button>
                                            </div>
                                        </div>
                                        <div className="cartItemQty mb-4">
                                            <button onClick={() => qty > 1 && setQty(qty - 1)} className="cartItemQtyChangeBtn cartItemQtyMinusBtn">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <div className="cartItemQtyValue">{qty}</div>
                                            <button onClick={() => setQty(qty + 1)} className="cartItemQtyChangeBtn cartItemQtyPlusBtn">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        {
                                            pdVariant?.length === 1 ?
                                                <div className="productDetailVariant">
                                                    <h6 className="">Variant:
                                                        <span className="pdDetailsVariantItemOne h5 badge text-wrap active-button ms-3"> {pdVariant[0]}</span>
                                                    </h6>
                                                </div>
                                                : pdVariant?.length > 1 ?
                                                    <div className="productDetailVariant">
                                                        <h6 className="">Variant: </h6>
                                                        {
                                                            pdVariant?.map(pd =>
                                                                <>
                                                                    <button onClick={() => setVariantDataInPrice(pd)} className={pdVariant.indexOf(pd) === selectedVariantIndex ? "active-button pdDetailsVariantItem badge text-wrap btn mb-2" : "pdDetailsVariantItem badge bg-green text-wrap btn mb-2"}>{pd}</button><br />
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    :
                                                    ""
                                        }
                                        <div className="mobileAddCartBtn">
                                            <Button style={{ width: "100%" }} onClick={addToCart} className="btn button"><span> <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</span></Button>
                                        </div>
                                        <div className="productDetailsAbout">
                                            <br />
                                            {
                                                pdDetails.featuresTitle?.length <= 2 ?
                                                    ""
                                                    :
                                                    <h5>About this product</h5>
                                            }
                                            <div className="d-flex">
                                                <div className="productDetailsAboutLeft">
                                                    {
                                                        pdDetails.featuresTitle?.length <= 2 ?
                                                            ""
                                                            :
                                                            pdDetails.featuresTitle?.map(pd =>
                                                                <li className="">{pd} </li>
                                                            )
                                                    }
                                                </div>
                                                <div className="productDetailsAboutRight">
                                                    {
                                                        pdDetails?.featuresValue?.length <= 2 ?
                                                            ""
                                                            :
                                                            pdDetails.featuresValue?.map(pd =>
                                                                <li className=""> <strong>:</strong> {pd}</li>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    );
};

export default ProductDetails;