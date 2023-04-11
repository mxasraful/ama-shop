import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserOrderItemDetails from '../UserOrderItemDetails/UserOrderItemDetails';

const UserOrderItem = ({ order }) => {

    const [detailsToggler, setDetailsToggler] = useState(false)


    // Handle Order Details Toggler 
    const handleToggler = () => {
        if (detailsToggler) {
            setDetailsToggler(false)
        } else {
            setDetailsToggler(true)
        }
    }

    return (
        <div>
            <li class="order">
                <div class="order-summary">
                    <h3>Order #12345</h3>
                    <p>Order Placed: January 1, 2023</p>
                    <p>Total: $100.00</p>
                </div>
                <Link class="order-details-link" onClick={() => handleToggler()} >View Details</Link>
            </li>
            {
                detailsToggler &&
                <UserOrderItemDetails order={order} />
            }
        </div>
    );
};

export default UserOrderItem;