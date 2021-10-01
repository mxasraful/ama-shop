import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import Loader from '../Reusable/Loader/Loader';
import Banner from './Banner/Banner';
import './home.css'

const Home = () => {

    const [productsData, setProductsData] = useState(null)
    const [bannerProducts, setBannerProducts] = useState(null)
    const [mobileProducts, setMobileProducts] = useState(null)
    const [laptopProducts, setLaptopProducts] = useState(null)
    const [bfpProduct, setBfpProduct] = useState(null)

    useEffect(() => {
        axios("/products")
            .then(res => {
                var data = res.data
                data = data.sort(() => Math.random() - 0.5)
                setProductsData(data)
                categoryLaptopProducts()
                categoryLaptopMobile()
            })
    }, [])

    useEffect(() => {
        setBannerProducts(productsData?.splice(0, 2))
    }, [productsData])

    const categoryLaptopMobile = () => {
        axios("/products/mobile")
            .then(res => {
                var data = res.data
                data = data.sort(() => Math.random() - 0.7)
                setMobileProducts(data.splice(0, 3))
            })
    }

    const categoryLaptopProducts = () => {
        axios("/products/laptop")
            .then(res => {
                var data = res.data
                data = data.sort(() => Math.random() - 0.5)
                setLaptopProducts(data.splice(0, 3))
            })
    }

    useEffect(() => {
        const pd = productsData?.find(dt => dt?.bfp === true)
        setBfpProduct(pd)
    }, [productsData])

    document.title = "Asrafuls Amazon Clone - Home"

    return (
        <div className="homeMain">
            {
                bannerProducts && mobileProducts && laptopProducts && bfpProduct ?
                    <>
                        <Banner />
                        <Products bannerProducts={bannerProducts} mobileProducts={mobileProducts} laptopProducts={laptopProducts} bfpProduct={bfpProduct} />
                    </>
                    :
                    <Loader />
            }
        </div>
    );
};

export default Home;