import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider/StateProvider';
import './orders.css'
import UserOrderItem from './UserOrderItem/UserOrderItem';

const Orders = () => {

    const [myOrders, setMyOrders] = useState(null)
    const [ordersLoading, setOrdersLoading] = useState(true)
    const [ordersError, setOrdersError] = useState(false)
    const [ordersErrorMsg, setOrdersErrorMsg] = useState(null)

    // Change Page Title
    document.title = "My Orders - Asrafuls Amazon Clone";


    const [{ user },] = useStateValue()

    useEffect(() => {
        console.log(myOrders)
    }, [myOrders])

    // Handle my orders 
    useEffect(() => {
        if (user?.email) {
            axios.post('/user-orders/get', {
                email: user.email
            })
                .then(res => {
                    const data = res.data
                    if (data.type === "data") {
                        setMyOrders(data.data)
                        setOrdersLoading(false)
                        setOrdersError(false)
                        setOrdersErrorMsg(null)
                    } else if (data.type === "error") {
                        setMyOrders(null)
                        setOrdersLoading(false)
                        setOrdersError(true)
                        setOrdersErrorMsg(data.errorMsg)
                    }
                })
                .catch(error => {
                    setMyOrders(null)
                    setOrdersLoading(false)
                    setOrdersError(true)
                    setOrdersErrorMsg(error.message)
                })
        }
    }, [user?.email])


    return (
        <div className="userOrderPage">
            <div className="container mt-5">
                <h3>My Orders</h3>
                {
                    ordersLoading ?
                        <>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                                <span>Loading...</span>
                            </div>
                        </>
                        :
                        <>
                            {
                                ordersError ?
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                                        <span>{ordersErrorMsg}</span>
                                    </div>
                                    :
                                    <section id="my-orders">
                                        {
                                            myOrders &&
                                            <ul class="order-list">
                                                {
                                                    myOrders.map(item => (
                                                            <UserOrderItem order={item} />
                                                    ))
                                                }
                                            </ul>
                                        }
                                    </section>
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default Orders;