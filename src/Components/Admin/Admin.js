import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider/StateProvider';
import AdminHeader from './AdminHeader/AdminHeader';

const Admin = () => {

    const [adminTrue, setAdminTrue] = useState()

    const [{ user }, dispatch] = useStateValue()

    // 
    useEffect(() => {
        axios(`/admin`)
            .then(res => {
                console.log(res)
            })
    }, [])

    return (
        <div className="admin-page-main">
            {
                // user?.find(it => {})
            }
            <AdminHeader />
        </div>
    );
};

export default Admin;