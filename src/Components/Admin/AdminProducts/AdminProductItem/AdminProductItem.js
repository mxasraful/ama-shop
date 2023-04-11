import React from 'react';

const AdminProductItem = ({ item }) => {
    return (
        <>
            {/* Delete Modal */}
            <div class="modal fade" id={`prodctItemDeleteModal${item.id}`} tabindex="-1" aria-labelledby="..." aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Are You Sure To Completely Delete This Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <img src={item.imgs[0]} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{item.title}</h5>
                                    <p class="card-text">Price: ${item.price[0]}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                            <button type="button" class="btn btn-danger px-4">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Modal */}

            {/* View Modal */}
            <div class="modal fade" id={`prodctItemViewModal${item.id}`} tabindex="-1" aria-labelledby="..." aria-hidden="true">
                <div class="modal-dialog  modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">View Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <h5 className='mb-4'>{item.title}</h5>
                            <div className="row">
                                <div class="card col-sm-5 p-3">
                                    <h6>Images</h6>
                                    {
                                        item.imgs.map(imageItem => (
                                            <>
                                                <img src={imageItem} class="mb-4" alt="..." style={{ maxHeight: "300px", maxWidth: "300px", margin: "auto" }} />
                                                <hr />
                                            </>
                                        ))
                                    }
                                </div>
                                <div className="col-sm-7">
                                    <div className="mb-3">
                                        <h4>Prices</h4>
                                        <table class="table  table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Varient</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.variant.map(variantItem => (
                                                        <tr>
                                                            <th scope="row">{item.variant.indexOf(variantItem) + 1}</th>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <span>{variantItem}</span>
                                                                    <div className="d-flex align-items-center ms-auto">
                                                                        <button className="btn btn-sm btn-success ">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <span>{item?.price[item.variant.indexOf(variantItem)]} $</span>
                                                                    <div className="d-flex align-items-center ms-auto">
                                                                        <button className="btn btn-sm btn-success ">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-3 mb-4">
                                        <h4>Specifications</h4>
                                        <table class="table  table-bordered">
                                            <tbody>

                                                {
                                                    item.featuresTitle?.length <= 2 ?
                                                        ""
                                                        :
                                                        item.featuresTitle?.map(pd =>
                                                            <tr>
                                                                <th scope="row">{item.featuresTitle.indexOf(pd) + 1}</th>
                                                                <td>{pd}</td>
                                                                <td>{item.featuresValue[item.featuresTitle.indexOf(pd)]} </td>
                                                            </tr>
                                                        )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="list-group-item list-group-item-action" aria-current="true">
                <div class="row">
                    <h6 class="col-1 d-flex align-items-center justify-content-center">
                        <img src={item.imgs[0]} alt="" className="img-fluid" style={{ maxWidth: "60px", maxHeight: "60px" }} />
                    </h6>
                    <h6 class="col-4 d-flex align-items-center">
                        <span>
                            {
                                item.title
                            }
                        </span>
                        <div className="d-flex align-items-center ms-auto">
                            <button className="btn btn-sm btn-success ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg>
                            </button>
                        </div>
                    </h6>
                    <h6 class="col-1 d-flex align-items-center">
                        {
                            item?.category
                        }
                    </h6>
                    <h6 class="col-1 align-items-center">
                        {
                            item.price.map(priceItem => (
                                <>
                                    <h6>{priceItem} $</h6>
                                </>
                            ))
                        }
                    </h6>
                    <h6 class="col-1 d-flex align-items-center">

                    </h6>
                    <h6 class="col-1 d-flex align-items-center">

                    </h6>
                    <h6 class="col-3 d-flex align-items-center">
                        <button className="btn btn-sm btn-info px-3 me-2 text-light" data-bs-toggle="modal" data-bs-target={`#prodctItemViewModal${item.id}`}>View</button>
                        <button className="btn btn-sm btn-success px-3 me-2">Edit</button>
                        <button className="btn btn-sm btn-danger px-3" data-bs-toggle="modal" data-bs-target={`#prodctItemDeleteModal${item.id}`}>Delete</button>
                    </h6>
                </div>
            </div>
        </>
    );
};

export default AdminProductItem;