import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useStateValue } from '../../StateProvider/StateProvider';
import './product.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Product = (props) => {

    const [, dispatch] = useStateValue()

    const { title, imgs, rating, category, id, price } = props.pd;

    // Add Cart Data in State
    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
                id: id,
                qty: 1,
                category: category,
                variant: 0,
                price: price[0]
            }
        })
    }

    return (
        <div className="productItem card mb-5">
            <div class="card-body">
                <Link to={`/product/${category}/${id}`} className="text-dark"><h6 class="card-title text-left">{title}</h6></Link>
                <h5>$ <strong> {props?.pd?.price?.length === 1 ? props?.pd?.price : props?.pd?.price?.length > 1 ? props?.pd?.price[0] : props?.pd?.price}.98</strong></h5>
                <div className="text-center productOvRatting">
                    {
                        rating &&
                        Array(rating)?.fill()?.map(() => (
                            <FontAwesomeIcon icon={faStar} />
                        ))
                    }
                </div>
                <Link to={`/product/${category}/${id}`} className="text-dark">
                    <div className="text-center">
                        <img className='img-fluid productImg' src={imgs[0]} alt="" />
                    </div>
                </Link><br />
                <div className="productAddCart text-center">
                    <Button onClick={addToCart} class="button productAddToCartBtn">
                        <span className="text-light"><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Product;