import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider/StateProvider';
import { getCartTotal } from '../StateProvider/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import './checkout.css'
import Loader from '../Reusable/Loader/Loader';
import PaymentOption from './PaymentOption/PaymentOption';
import AddAddress from './AddAddress/AddAddress';

const Checkout = () => {

    const [allCountryList, setAllCountryList] = useState(null)

    const [allAddresses, setAllAddresses] = useState(null)
    const [addAddressError, setAddAddressError] = useState(false)
    const [addAddressErrorMsg, setAddAddressErrorMsg] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)

    const [paymentOk, setPaymentOk] = useState(false)
    const [paymentOption, setPaymentOption] = useState(null)
    const [paySuccess, setPaySuccess] = useState(false)

    const [deliveryAddressErr, setDeliveryAddressErr] = useState(false)

    const [paymentInfo, setPaymentInfo] = useState(null)
    const [ordSuccesses, setOrdSuccesses] = useState(false)
    const [ordSuccessesErr, setOrdSuccessesErr] = useState(null)

    // Store users secret data
    const [userSecret, setUserSecret] = useState(true)

    const [{ cart, user },] = useStateValue()

    // Get users card details
    useEffect(() => {
        const getUsersSecret = async () => {
            const response = await axios({
                method: "POST",
                url: `/payment/create?total=${getCartTotal(cart)}`
            })
            setUserSecret(response.data.userSecret)
        }
        getUsersSecret()
    }, [cart])

    // Place Order
    const placeOrder = () => {
        if (allAddresses) {
            setDeliveryAddressErr(false)
            const paymentId = () => {
                if (paymentInfo) {
                    return paymentInfo.id
                } else {
                    return null
                }
            }
            const orderData = {
                items: cart,
                total: getCartTotal,
                paymentMethod: paymentOption,
                paymentId: paymentId(),
                paymentStatus: "success",
                status: 'processing',
                addressItem: selectedAddress
            }
            axios.post('/post-order', orderData)
                .then(res => {
                    if (res.status === 200) {
                        setOrdSuccesses(true)
                        localStorage.removeItem("asrafuls-ama-cart-items")
                    }
                })
                .catch(err => {
                    setOrdSuccessesErr(err.message)
                })
        } else {
            setDeliveryAddressErr(true)
        }
    }

    // get all country list in array
    useEffect(() => {
        axios('https://api.dhsprogram.com/rest/dhs/countries')
            .then(data => {
                setAllCountryList(data.data.Data)
            })
    }, [])


    return (
        <div className="">
            {
                ordSuccesses ?
                    <div className="checkoutOrderSuccessMsg">
                        {
                            ordSuccessesErr ?
                                <div className="alert alert-danger px-3 py-3 w-25 text-center" style={{ margin: "40vh auto" }}>
                                    <h6>{ordSuccessesErr}.</h6>
                                </div>
                                :
                                <div className="alert alert-success px-3 py-3 w-25 text-center" style={{ margin: "40vh auto" }}>
                                    <h5>Order Successful.</h5>
                                    <br /><br />
                                    <a href="/"><Button className="button">Continue Shopping</Button></a>
                                </div>
                        }
                    </div>
                    :
                    <div className="checkoutMain">
                        {
                            cart.length >= 1 &&
                            <div className="checkoutHeaderLength bg-light text-center">
                                <br />
                                <h4 className="pb-4">Checkout (<Link to="/user/cart"> {cart?.length} items</Link> )</h4>
                            </div>
                        }
                        <div className="container">
                            {
                                cart.length >= 1 ?
                                    <>
                                        {
                                            allCountryList ?
                                                <>
                                                    <h4 className="mt-2 mb-1">Hello {user?.name}</h4>
                                                    <h3>Checkout Your Products</h3>
                                                    {
                                                        addAddressError &&
                                                        <div className="alert-danger">
                                                            {addAddressErrorMsg}
                                                        </div>
                                                    }
                                                    <div className="row mt-5">
                                                        <div className="col-md-7">
                                                            <AddAddress
                                                                allCountryList={allCountryList}
                                                                setAllAddresses={setAllAddresses}
                                                                setAddAddressError={setAddAddressError}
                                                                setAddAddressErrorMsg={setAddAddressErrorMsg}
                                                                allAddresses={allAddresses}
                                                                setSelectedAddress={setSelectedAddress}
                                                                selectedAddress={selectedAddress}
                                                                deliveryAddressErr={deliveryAddressErr}
                                                            />
                                                        </div>
                                                        <div className="col-md-5">
                                                            <PaymentOption
                                                                setDeliveryAddressErr={setDeliveryAddressErr}
                                                                selectedAddress={selectedAddress}
                                                                setPaymentOk={setPaymentOk}
                                                                setPaymentInfo={setPaymentInfo}
                                                                setPaymentOption={setPaymentOption}
                                                                setPaySuccess={setPaySuccess}
                                                                paymentOption={paymentOption}
                                                                paySuccess={paySuccess}
                                                            />
                                                            <div className="mt-4 text-center">
                                                                <Button onClick={placeOrder} className="button checkoutOrderBtn w-75 " disabled={paymentOk || paySuccess ? null : "disabled"}>Place Order</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <Loader />
                                        }
                                    </>
                                    :
                                    <div className="container">
                                        <div className="alert alert-danger mb2 text-center mt-4">
                                            <span> You don't have any products in your cart.</span><br /><br />
                                            <Link to="/" className="button btn">Continue Shopping</Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default Checkout;