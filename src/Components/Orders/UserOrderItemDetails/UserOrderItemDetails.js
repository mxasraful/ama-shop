import React from 'react';

const UserOrderItemDetails = ({order}) => {
    return (
        <section id="order-details">
            <h2>Order #12345 Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Product A</td>
                        <td>$50.00</td>
                        <td>1</td>
                        <td>$50.00</td>
                    </tr>
                    <tr>
                        <td>Product B</td>
                        <td>$25.00</td>
                        <td>2</td>
                        <td>$50.00</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Total:</th>
                        <td>$100.00</td>
                    </tr>
                </tfoot>
            </table>
            <div class="shipping-address">
                <h3>Shipping Address</h3>
                <p>John Doe</p>
                <p>123 Main St.</p>
                <p>Anytown, USA 12345</p>
            </div>
            <div class="payment-method">
                <h3>Payment Method</h3>
                <p>Visa ending in 1234</p>
            </div>
            <div class="order-status">
                <h3>Order Status</h3>
                <p>Shipped</p>
                <button class="cancel-order-btn">Cancel Order</button>
            </div>
        </section>
    );
};

export default UserOrderItemDetails;