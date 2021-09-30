import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Reusable/Loader/Loader';
import Product from './../Reusable/Product/Product'

const Search = () => {
    const [items, setItems] = useState(null)
    const [searchErrMsg, setSearchErrMsg] = useState(null)

    const searchName = window.location?.search?.split('=')[1]

    useEffect(() => {
        axios.get(`/search?name=${searchName}`)
            .then(res => {
                if (res.data.length > 0) {
                    setItems(res.data)
                    setSearchErrMsg(null)
                } else {
                    setSearchErrMsg(`You don't have any result in '${searchName}' keyword.`)
                }
            })
            .catch(err => {
                setSearchErrMsg(err.message)
                setItems(null)
            })
    }, [searchName])

    console.log(items)

    return (
        <div className="searchItemsMain">
            <div className="container">
                {
                    searchErrMsg ?
                        <div className="d-flex justify-content-center">
                            <div className="alert alert-danger px-5" style={{margin: "41vh 0"}}>
                                {searchErrMsg}
                            </div>
                        </div>
                        :
                        <>
                            {
                                items ?
                                    <>
                                        <div className="searchPageTitle mt-4 mb-5">
                                            <h4 className="text-center">Search Result By {searchName}</h4>
                                        </div>
                                        <div className="row">
                                            {
                                                items?.map(item => (
                                                    <div className="col-md-4 mb-4">
                                                        <Product pd={item} />
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                    :
                                    <Loader />
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default Search;