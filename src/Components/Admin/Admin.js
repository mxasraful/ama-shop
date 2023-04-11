import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider/StateProvider';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminProducts from './AdminProducts/AdminProducts';

const Admin = () => {

    const [adminTrue, setAdminTrue] = useState()

    const [{ user }, dispatch] = useStateValue()


    const pathname = useParams()?.section

    // 
    useEffect(() => {
        axios(`/admin`)
            .then(res => {
                console.log(res)
            })
    }, [])

    return (
        <div className="admin-page-main">
            <AdminHeader />
            {
                pathname === "products" ?
                    <AdminProducts />
                    :
                    pathname === "orders" ?
                        "Orders"
                        :
                        pathname === "users" ?
                            "users"
                            :
                            "Home"
            }
        </div>
    );
};

export default Admin;