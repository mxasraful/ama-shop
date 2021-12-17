import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHeader.css'

const AdminHeader = () => {

    return (
        <div className='adminHeaderMain'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ background: "#e3f2fd" }}>
                <div class="container">
                    <a class="navbar-brand" href="/admin">
                        <img src="https://asrafulweb.com/static/media/AsrafulWeb.23b66f3f.png" alt="" className='img-fluid' style={{ width: "60px" }} />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <div class="">
                            <form class="d-flex input-group mb-3 admin-search-form pt-3">
                                <span class="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </span>
                                <input type="search" class="form-control" placeholder="Serch..." />
                            </form>
                        </div>
                        <ul className="ms-auto navbar-nav admin-header-nav-items">
                            <li class="nav-item me-4 mt-1 dropdown">
                                <Link className='text-dark' id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bell-fill mb-1" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill mb-1" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                </Link>
                            </li>
                            <li class="nav-item dropdown">
                                <div className="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className='img-fluid mb-1' style={{ width: "30px", height: "auto" }} src="https://lh3.googleusercontent.com/ogw/ADea4I7P2UrnzgetD-oEK-_E7-Wp62eXJee8GIY0H60e1w=s30-c-mo" alt="" />
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li class="bg-success text-center text-light py-2"><h5>Admin</h5></li>
                                    <li>
                                        <Link class="dropdown-item" to="/admin/profile">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person me-3 mb-1" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                            </svg>
                                            <span> Profile</span>
                                        </Link>
                                    </li>
                                    <li>
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