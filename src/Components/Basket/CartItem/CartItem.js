import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './cartItem.css';
import { Link } from 'react-router-dom';
import Loader from '../../Reusable/Loader/Loader';
import axios from 'axios';

const CartItem = ({ pd, removeItem }) => {

    const [itemDetail, setItemDetail] = useState({})

    const [cartItemLoader, setCartItemLoader] = useState(true)

    const [qty, setQty] = useState(1)

    // Get data from database
    useEffect(() => {
        axios(`/product/${pd.id}`)
        .then(res => {
            const data = res.data
                data.variant = data.variant[pd.variant]
                setQty(pd.qty)
                setItemDetail(data)
                setCartItemLoader(false)
            })
    }, [pd])


    return (
        <div className="cartItem row">
            {
                itemDetail?.imgs &&
                <>
                    {
                        cartItemLoader ?
                            <Loader />
                            :
                            <>
                                <div style={{ height: "200px" }} className="cartItemImgSection text-center col-3">
                                    <img src={itemDetail?.imgs[0]} alt="Amazon Cart Item" className="cartItemImg img-fit" />
                                </div>
                                <div className="cartItemTextSection col-9">
                                    <Link to={`./../../product/${itemDetail?.category}/${itemDetail?.id}`} className="h6">{itemDetail?.title}</Link>
                                    <div className="d-flex">
                                        <div>

                                            <div className="cartItemWithoutTitle">
                                                <div className="cartItemRatingAndPrice">
                                                    <div className="cartItemRating mt-2 mb-2">
                                                        {
                                                            Array(itemDetail?.rating).fill().map(() => (
                                                                <FontAwesomeIcon icon={faStar} />
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="cartItemPrice mt-1 mb-1">
                                                        <h4 className="">$ <strong>{pd?.price}.98</strong></h4>
                                                    </div>
                                                    <div className="cartItemSmallQty">
                                                        <h6>Quantity: <span className="h5"> {qty}</span></h6>
                                                    </div>
                                                </div>
                                                <div className="cartItemQtyAndBtn">
                                                    <div className="cartItemVariant badge bg-green text-wrap">{itemDetail?.variant}</div>
                                                    {/* <div className="cartItemQty">
                                            <button onClick={() => {
                                                pd?.qty > 1 &&
                                                    qtyMinus(1)
                                            }} className="cartItemQtyChangeBtn cartItemQtyMinusBtn">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <div className="cartItemQtyValue">{pd.qty}</div>
                                            <button onClick={() => {
                                                setQty(qty + 1)
                                                qtyPlus(1)
                                            }} className="cartItemQtyChangeBtn cartItemQtyPlusBtn">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div> */}
                                                </div>
                                                <div className="">
                                                    <button onClick={() => removeItem(itemDetail?.id)} className="mt-3 btn btn-outline-warning btn-sm mobileRemoveCartBtn"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => removeItem(itemDetail?.id)} className="mt-5 ms-5 btn btn-primary button removeCartBtn"><FontAwesomeIcon icon={faTrashAlt} /> Remove From Cart</button>
                                    </div>
                                </div>
                            </>
                    }
                </>
            }
        </div>
    );
};

export default CartItem;