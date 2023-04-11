import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider/StateProvider';
import './AdminHeader.css'

const AdminHeader = () => {


    const [{ user },] = useStateValue()

    const pathname = useParams()?.section

    console.log(pathname)

    return (
        <div className='adminHeaderMain'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ background: "#e3f2fd" }}>
                <div class="container">
                    <Link className='me-3' to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-compact-left text-dark" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z" />
                        </svg>
                    </Link>
                    <Link class="navbar-brand" to="/admin">
                        <img src="https://asrafulweb.com/static/media/AsrafulWeb.23b66f3f.png" alt="" className='img-fluid' style={{ width: "60px" }} />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <div class="ms-3">
                            <Link to="/admin/products">
                                <button className={pathname === "products" ? "btn  btn-outline-dark active btn-sm me-3 px-4" : "btn btn-outline-dark btn-sm me-3 px-4"}>Products</button>
                            </Link>
                            <Link to="/admin/orders">
                                <button className={pathname === "orders" ? "btn  btn-outline-dark active btn-sm me-3 px-4" : "btn btn-outline-dark btn-sm me-3 px-4"}>Orders</button>
                            </Link>
                            <Link to="/admin/users">
                                <button className={pathname === "users" ? "btn  btn-outline-dark active btn-sm me-3 px-4" : "btn btn-outline-dark btn-sm me-3 px-4"}>Users</button>
                            </Link>
                        </div>
                        <ul className="ms-auto navbar-nav admin-header-nav-items">
                            <li class="nav-item me-4 mt-1 dropdown">
                                <Link className='text-dark' id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/psnhyobz.json"
                                        trigger="hover"
                                        style={{ width: "30px", height: "30px" }}>
                                    </lord-icon>
                                </Link>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickableInside" style={{ width: "300px", height: "350px", left: '-200px' }}>
                                    <h5 className='px-3'>Notifications</h5>
                                    <hr />
                                    <div class="list-group">
                                        <Link to="/admin/nf/item/43iiu4" class="list-group-item list-group-item-action" aria-current="true">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1 text-bold">List group item heading</h6>
                                                <small>3 days ago</small>
                                            </div>
                                            <span class="mb-1">Some placeholder content in a paragraph.</span>
                                            <small>And some small print.</small>
                                        </Link>
                                        <Link to="/admin/nf/item/43iiu4" class="list-group-item list-group-item-action">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1 text-bold">List group item heading</h6>
                                                <small>3 days ago</small>
                                            </div>
                                            <span class="mb-1">Some placeholder content in a paragraph.</span>
                                            <small>And some small print.</small>
                                        </Link>
                                        <Link to="/admin/nf/item/43iiu4" class="list-group-item list-group-item-action" >
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1 text-bold">List group item heading</h6>
                                                <small>3 days ago</small>
                                            </div>
                                            <span class="mb-1">Some placeholder content in a paragraph.</span>
                                            <small>And some small print.</small>
                                        </Link>
                                    </div>
                                </ul>
                            </li>
                            <li class="nav-item me-4 mt-1">
                                <Link to="/admin/options" className='text-dark'>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hwuyodym.json"
                                        trigger="hover"
                                        style={{ width: "30px", height: "30px" }}>
                                    </lord-icon>
                                </Link>
                            </li>
                            <li class="nav-item dropdown">
                                <div className="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/hbvyhtse.json"
                                        trigger="hover"
                                        style={{ width: "30px", height: "30px" }}>
                                    </lord-icon>
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li class="bg-success text-center text-light py-2 w-100"><h5>Admin</h5></li>
                                    <span className='py-2 text-center'>{user?.email}</span>
                                    <li className="w-100">
                                        <Link class="dropdown-item" to="/admin/profile">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person me-3 mb-1" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                            </svg>
                                            <span> Profile</span>
                                        </Link>
                                    </li>
                                    <li className='w-100'>
                                        <Link class="dropdown-item" to="/admin/ac-options">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders me-3 mb-1" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                                            </svg>
                                            <span> Admin Options</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;