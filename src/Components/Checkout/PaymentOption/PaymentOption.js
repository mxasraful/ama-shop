import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStateValue } from '../../StateProvider/StateProvider';
import { getCartTotal } from '../../StateProvider/reducer';

const PaymentOption = ({setDeliveryAddressErr, selectedAddress, setPaymentOk, setPaymentInfo, setPaymentOption, setPaySuccess, paymentOption, paySuccess}) => {

    const [cardPayEmptyError, setCardPayEmptyError] = useState(false)
    const [cardPayErrorMsg, setCardPayErrorMsg] = useState(null)

    const [ordProcessing, setOrdProcessing] = useState(false)
    
    
    const stripe = useStripe();
    const elements = useElements();

    const [{ cart },] = useStateValue()

    // Pay management
    const paySelect = () => {
        const payCod = document.querySelector("#payCodCheckbox")
        const payPayPal = document.querySelector("#payPayPalCheckbox")
        const payCard = document.querySelector("#cardCheckbox")
        if (payCod.checked === true) {
            setPaymentOk(true)
            setPaymentOption("cod")
        } else if (payPayPal.checked === true) {
            setPaymentOk(false)
            setPaymentOption("paypal")
        } else if (payCard.checked === true) {
            setPaymentOk(false)
            setPaymentOption("card")
        } else {
            setPaymentOk(false)
            setPaymentOption(null)
        }
    }
    
    // Handel card pay input 
    const handelCardPayInputChange = (e) => {
        setCardPayEmptyError(e.empty)
        setCardPayErrorMsg(e.error ? e.error.message : null)
    }


    // Card pay submit
    const handleCardPaySubmit = async (event) => {
        setDeliveryAddressErr(false)
        setOrdProcessing(true)
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setCardPayErrorMsg()
        } else {
            setPaySuccess(true)
            setOrdProcessing(false)
            setPaymentInfo(paymentMethod)
        }
    };
    


    return (
        <div>

            <div className="checkoutPaymentForm">
                <div className="card position-relative">
                    <div className="card-body">
                        <h4 className='mb-3'>Payment Option</h4>
                        <form action="">
                            <div class="form-check">
                                <input onClick={paySelect} class="form-check-input" type="radio" name="flexRadioDefault" id="payCodCheckbox" />
                                <label class="form-check-label h6" for="payCodCheckbox">Cash On Delivery</label>
                            </div>
                            <div class="form-check">
                                <input onClick={paySelect} class="form-check-input" type="radio" name="flexRadioDefault" id="payPayPalCheckbox" />
                                <label class="form-check-label h6" for="payPayPalCheckbox">PayPal</label>
                            </div>
                            <div class="form-check">
                                <input onClick={paySelect} class="form-check-input" type="radio" name="flexRadioDefault" id="cardCheckbox" />
                                <label class="form-check-label h6" for="cardCheckbox">Credit or Debit Card</label>
                            </div>
                        </form>
                        <br />
                        {
                            paymentOption === "paypal" &&
                            <div className="payPalPayForm card">
                                <div className="card-body text=center">
                                    <img src="https://cdn.merchantmaverick.com/wp-content/uploads/2013/03/Paypal-Logo-2015.png" alt="" className="img-fluid w-50" />
                                    <br /><br />
                                    <p class="text-muted">
                                        Total Amount:
                                        <span className="h5 text-dark">
                                            <CurrencyFormat
                                                renderText={(value) => (<span> {value}</span>)}
                                                decimalScale={2}
                                                value={getCartTotal(cart)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                            />
                                        </span>
                                    </p>
                                    <br /><br />
                                    <div className="text-center">
                                        <Button onClick={() => {
                                            setPaySuccess(true)
                                        }} className="button checkoutOrderBtn w-100" disabled={paySuccess ? "disabled" : ""}>Pay Now</Button>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            paymentOption === "card" &&
                            <form className="checkoutCardPayOptionForm card" action="" onSubmit={handleCardPaySubmit}>
                                <div className="card-body">

                                    <h6 className="mb-4">Enter Your Card Details</h6>
                                    {
                                        cardPayEmptyError ?
                                            <div className="alert-warning mb-4 px-3 py-2 border rounded">
                                                Card Info is Empty.
                                            </div>
                                            : cardPayErrorMsg ?
                                                <div className="alert-warning mb-4 px-3 py-2 border rounded">
                                                    {cardPayErrorMsg}
                                                </div>
                                                :
                                                ""
                                    }
                                    <CardElement onChange={handelCardPayInputChange} />
                                    <br />
                                    <p class="text-muted">
                                        Total Amount:
                                        <span className="h5 text-dark">
                                            <CurrencyFormat
                                                renderText={(value) => (<span> {value}</span>)}
                                                decimalScale={2}
                                                value={getCartTotal(cart)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                            />
                                        </span>
                                    </p>
                                    <div className="text-center mt-5">
                                        <Button type="submit" className="button checkoutOrderBtn w-100" disabled={cardPayEmptyError ? "disabled" : cardPayErrorMsg ? "disabled" : ordProcessing ? "disabled" : ""}>
                                            <span>{ordProcessing ? "Processing" : "Pay Now"}</span>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        }
                        <br />
                    </div>
                    {
                        paySuccess ?
                            <div className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center" style={{ background: '#1ebb544a', backdropFilter: "blur(3px)" }}>
                                <div className=" h5">Payment successful.</div>
                            </div>
                            :
                            <>
                                {
                                    typeof (selectedAddress) === "number" ?
                                        <>
                                        </>
                                        :
                                        <div className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center" style={{ background: '#ffffffb0', backdropFilter: "blur(3px)" }}>
                                            <div className=" h5">Select or add a address for payment.</div>
                                        </div>
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default PaymentOption;