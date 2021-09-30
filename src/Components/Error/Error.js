import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="errorPageMain">
            <div className="container">
                <div className="alert alert-danger mt-5 text-center">
                    <br />
                    <span className="">
                        <span className="h5 me-1">Oops</span>
                        <span className="h1 text-bold"> 404 </span>
                        <span className="h5 ms-1">Error</span>
                    </span>
                    <br /><br />
                    <div className="text-center">
                        <Link to="/" className="btn btn-success">Go To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;