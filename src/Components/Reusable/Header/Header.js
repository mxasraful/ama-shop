import React, { useState } from 'react';
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

    // Handle Search Items
    const searchItems = (e) => {
        e.preventDefault()
        if (searchValue.length > 0) {
            window.location.replace(`/search?name=${searchValue}`)
        }
    }

    return (
        <div className='headerMain'>
            <div className="header_container fluid-row">
                <div className="headerLogoSection col-1">
                    <Link to="/" className="headerLogo">
                        <img className="headerLogoImg mt-2" src={logo} alt="" />
                    </Link>
                </div>
                <div className="headerSearchSection col-8 d-flex">
                    <form onSubmit={searchItems} className="headerSearch mt-2 text-center" style={{ width: "85%" }}>
                        <input type="text" className="headerSearchInput" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Your Product..." />
                        <button type="submit" className="headerSearchSubmit" >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                    <div className="headerAdminBtn mt-2 me-4" style={{ width: "15%" }}>
                        <a href="/admin"><Button className='px-4' variant="outlined" color="secondary">Admin</Button></a>
                    </div>
                </div>
                <div className="headerAuthSection col-3">
                    {
                        user ?
                            <div className="headerSignIn text-light col-6">
                                <small>Hello {user?.name}</small>
                                <h6>Sign Out</h6>
                                <div className="headerSignOutDropdown">
                                    <div className="card">
                                        <div className="card-body">
                                            <span className="h6 mb-3 text-dark">Do you want to remove your account from this website?</span><br />
                                            <div className="text-center">
                                                <Button onClick={authSignOut} className="button">Sign Out</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <Link to="/login" className="headerSignIn text-light col-6">
                                <small>Hello</small>
                                <h6>Sign in</h6>
                            </Link>
                    }
                    <Link to="/user/orders" className="headerOrder text-light col-3">
                        <small>Returns</small>
                        <h6>& Orders</h6>
                    </Link>
                    <Link to='/user/cart' className="headerCart text-light col-3 ps-3 text-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <span className="mt-2"><strong>{cart?.length}</strong></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;