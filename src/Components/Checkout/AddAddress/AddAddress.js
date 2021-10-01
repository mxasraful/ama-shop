import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStateValue } from '../../StateProvider/StateProvider';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const AddAddress = ({ setAllAddresses, setAddAddressError, setAddAddressErrorMsg, allAddresses, setSelectedAddress, selectedAddress, deliveryAddressErr, allCountryList }) => {

    const [addressAddLoading, setAddressAddLoading] = useState(false)

    // React hook form use
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [{ user },] = useStateValue()

    // Add address in db
    const addAddress = data => {
        setAddressAddLoading(true)
        data.userId = user.userId
        data.email = user.email
        axios(`/get-delivery-address?userId=${user.userId}`)
        .then(res => {
            const data = res.data
            const dt = res.data
                setAllAddresses(dt)
                if (dt.find(dt => dt === data)) {
                    setAddAddressError(true)
                    setAddAddressErrorMsg("You Already Added This Address")
                } else {
                    setAddAddressError(false)
                    axios.post('/addADeliveryAddress', data)
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                setAddressAddLoading(false)
                reset()
            })
    }

    // Get all delivery existingDeliveryAddresses
    useEffect(() => {
        axios(`/get-delivery-address?userId=${user.userId}`)
        .then(res => {
            const data = res.data
                if (data?.length > 0) {
                    setAllAddresses(data)
                } else {

                }
            })
            .catch(error => {
                setAllAddresses(null)
            })
    }, [user, addressAddLoading])

    // set default add res
    useEffect(() => {
        if (allAddresses?.length === 1) {
            setSelectedAddress(0)
        }
    }, [allAddresses])


    return (
        <div>

            <div className="existingDeliveryAddresses mb-4">
                {
                    allAddresses ?
                        <div className="card px-3 py-3">
                            <h4 className="mb-3">Select Your Current Address</h4>
                            {
                                allAddresses?.length === 1 ?
                                    <div className="address-item address-item-selected card px-2 py-2 mb-2 d-flex bg-light border border-success" id={allAddresses[0].zip + allAddresses[0].state + allAddresses[0].city + "flexRadio"} >
                                        <div className="selected-address-icon text-success me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg>
                                        </div>
                                        <div class="address-item-label" for={allAddresses[0].zip + allAddresses[0].city + allAddresses[0].city + "flexRadio"}>{allAddresses[0].addressL1 && allAddresses[0].addressL1 + ", "}{allAddresses[0].addressL2 && allAddresses[0].addressL2 + ", "}{allAddresses[0].zip} - {allAddresses[0].city}, {allAddresses[0].country}</div>
                                    </div>
                                    :
                                    <div className="delivery-address-items">
                                        {
                                            allAddresses?.map(data =>
                                                <div className={allAddresses.indexOf(data) === selectedAddress ? "address-item address-item-selected card px-2 py-2 mb-2 d-flex bg-light border border-success" : "address-item address-item-selected card px-2 py-2 mb-2 d-flex bg-light"} id={data.zip + data.city + data.city + "flexRadio"} onClick={() => setSelectedAddress(allAddresses.indexOf(data))} >
                                                    {
                                                        allAddresses.indexOf(data) === selectedAddress &&
                                                        (
                                                            <div className="selected-address-icon text-success me-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                </svg>
                                                            </div>
                                                        )
                                                    }
                                                    <div class="address-item-label" for={data.zip + data.city + data.city + "flexRadio"}>{data.addressL1 && data.addressL1 + ", "}{data.addressL2 && data.addressL2 + ", "}{data.zip} - {data.city}, {data.country}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </div>
                        :
                        ""
                }
            </div>
            <h4>Add Delivery Address</h4>
            {
                deliveryAddressErr &&
                <div className="alert alert-warning">
                    <span>You do not added delivery address. </span><br />
                    <span>Please add a delivery address.</span>
                </div>
            }
            {
                addressAddLoading ?
                    <div className="addressAddFormLoader">
                        <div className="text-center mt-5 mb-5">
                            <span className="">Adding...</span>
                        </div>
                    </div>
                    :
                    <form className="checkoutDeliveryDetails">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="inputCountrySelect" aria-label="Floating label select example" {...register('country', { required: true })} >
                                {
                                    allCountryList?.map(dt =>
                                        <option value={dt?.CountryName}>{dt?.CountryName}</option>
                                    )
                                }
                            </select>
                            <label for="inputCountrySelect">Country</label>
                            {errors.country && <span className="text-danger">Country is required</span>}
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="inputState" placeholder="State" {...register('state', { required: true })} />
                            <label for="inputState">State</label>
                            {errors.state && <span className="text-danger">State is required</span>}
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="inputCity" placeholder="City" {...register('city', { required: true })} />
                            <label for="inputCity">City</label>
                            {errors.city && <span className="text-danger">City is required</span>}
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="inputAddressL1" placeholder="Address Line 1"  {...register('addressL1', { required: true })} />
                            <label for="inputAddressL1">Address Line 1</label>
                            {errors.addressL1 && <span className="text-danger">Address Line 1 is required</span>}
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="inputAddressL2" placeholder="Address Line 2" />
                            <label for="inputAddressL2">Address Line 2</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="inputZip" placeholder="Zip Code"  {...register('zip', { required: true })} />
                            <label for="inputZip">Zip Code</label>
                            {errors.zip && <span className="text-danger">Zip is required</span>}
                        </div>
                        <br />
                        <Button onClick={
                            handleSubmit(addAddress)
                        } type='submit' className="addAddressBtn button mb-5">Add Address</Button>
                    </form>
            }
        </div>
    );
};

export default AddAddress;