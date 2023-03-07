import React, { useState } from 'react';
import CartItem from './CartItem/CartItem';
import { useStateValue } from '../StateProvider/StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from '../StateProvider/reducer';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './basket.css';
import Button from '@material-ui/core/Button';

const Basket = () => {

    const [{ cart, user }, dispatch] = useStateValue()

    const [checkoutError, setCheckoutError] = useState(null)

    const history = useHistory()

    // // Function For remove cart item
    const removeFromCart = (id) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        })
    }

    document.title = "Asrafuls Amazon - Cart"

    return (
        <div className="cartMain container-fluid" >
            <div className="container h-100">
                <div className="row">
                    {
                        checkoutError &&
                        <div className="container">
                            <div className="alert alert-danger mb2 text-center">
                                <span> You don't have any products in your cart.</span><br /><br />
                                <Link to="/" className=""><Button className="button"> Continue Shopping</Button></Link>
                            </div>
                        </div>
                    }
                    <div className="col-sm-9">
                        <div className="cartItems" id="allCartItems">
                            {
                                user &&
                                <h4 className="mb-2">Hello {user?.name}</h4>
                            }
                            <h2>Shopping Cart</h2>
                            <br />
                            {
                                cart?.length < 1 && checkoutError === null &&
                                <>
                                    <div className="alert alert-info mx-2">
                                        <span> You don't have any products in your cart.</span><br /><br />
                                        <Link to="/" className=""><Button className="button">Continue Shopping</Button></Link>
                                    </div>
                                    {
                                        user ?
                                            ""
                                            :
                                            <div className="alert alert-primary mx-3">
                                                <span>You have not yet signed in. </span><br /><br />
                                                <Link to="/login" className="btn btn-warning">Sign In / Sign Up</Link>
                                            </div>
                                    }
                                </>
                            }
                            {
                                cart?.map(dt =>
                                    <CartItem
                                        removeItem={removeFromCart}
                                        pd={dt}
                                    />
                                )
                            }
                            {
                                cart?.length < 1 &&
                                <div style={{ height: '40vh' }}></div>
                            }
                            {
                                cart.length === 1 &&
                                <div style={{ height: '24vh' }}></div>
                            }
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <CurrencyFormat
                            renderText={(value) => (
                                <div className="cartCheckout">
                                    <h5>Subtotal ({cart?.length} items): <strong>{value}</strong></h5>
                                    <br /><br />
                                    <Button onClick={() => cart.length >= 1 ? history.push("/user/cart/items/checkout") : setCheckoutError("You don't have any products in your cart.")} className="btn btn-danger text-light button">{user ? "Proceed to checkout" : "Login to checkout"}</Button>
                                </div>
                            )}
                            decimalScale={2}
                            value={getCartTotal(cart)}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                        />
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Basket;