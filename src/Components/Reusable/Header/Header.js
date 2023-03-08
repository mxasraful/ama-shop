import React, { useEffect, useState } from 'react';
import logo from "./../../../logo/amazon_logo_2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider/StateProvider';
import useAuth from '../../SignIn/Auth';
import { Button } from '@material-ui/core';

const Header = () => {

    const [searchValue, setSearchValue] = useState(null)

    const [{ cart, user },] = useStateValue()

    const { authSignOut } = useAuth()

    const searchQuery = window.location.search.replace("?name=", "")

    // Handle Search Items
    const searchItems = (e) => {
        e.preventDefault()
        if (searchValue.length > 0) {
            window.location.replace(`/search?name=${searchValue}`)
        }
    }

    console.log()

    // Set Search Input Value
    useEffect(() => {
        if (searchQuery.length > 0) {
            setSearchValue(searchQuery)
        }
    }, [searchQuery])

    return (
        <div className='headerMain'>
            <div className='container'>
                <div className="header_container fluid-row py-2">
                    <div className="headerLogoSection col-1">
                        <Link to="/" className="headerLogo">
                            <img className="headerLogoImg mt-2" src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="headerSearchSection col-8 d-flex">
                        <form onSubmit={searchItems} className="headerSearch mt-1 text-center" style={{ width: "85%" }}>
                            <input type="text" className="headerSearchInput" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Search Your Product..." />
                            <button type="submit" className="headerSearchSubmit" >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                        {
                            <div className="headerAdminBtn mt-2 me-4" style={{ width: "15%" }}>
                                <a href="/admin"><Button className='px-4' variant="outlined" color="secondary">Admin</Button></a>
                            </div>
                        }
                    </div>
                    <div className="headerAuthSection d-flex col-2 ms-auto justify-content-end">
                        {
                            user ?
                                <div className="headerSignIn text-light col-6 mt-2">
                                    <h6>Hello <b>{user?.name}</b></h6>
                                    <div className="headerSignOutDropdown">
                                        <div className="card">
                                            <div className="card-body">
                                                <small className="mb-3 text-dark">Do you want to remove your account from this website?</small><br /><br />
                                                <div className="text-center">
                                                    <Button onClick={authSignOut} className="button">Sign Out</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <Link to="/login" className="headerSignIn text-light col-6 mt-3">
                                    <h6>Sign in</h6>
                                </Link>
                        }
                        <Link to='/user/cart' className="headerCart text-light mt-1 mb-1">
                            <button type="button" class="btn btn-sm text-light position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                </svg>
                                {
                                    cart?.length > 0 &&
                                    <span class="position-absolute top-0 start-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                                        <span class="visually-hidden">New Cart Item</span>
                                    </span>
                                }
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="headerSearchForMobile d-flex">
                <form onSubmit={searchItems} className="headerSearch container mt-1 text-center py-3">
                    <input type="text" className="headerSearchInput" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Search Your Product..." />
                    <button type="submit" className="headerSearchSubmit px-3 w-auto" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-search mb-1" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>
                {/* <div className="headerAdminBtn mt-2 me-4" style={{ width: "15%" }}>
                            <a href="/admin"><Button className='px-4' variant="outlined" color="secondary">Admin</Button></a>
                        </div> */}
            </div>
        </div>
    );
};

export default Header;