import React from 'react';
import './banner.css'

const Banner = () => {
    return (
        <div id="carouselExampleIndicators" class="carousel slide bannerMain" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg" class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/ElecDays/March/GWRev/E_days_Tallhero_1500x600._CB657442870_.jpg" class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Gateway_JWELSSH/Feb/SSW/1500PC._CB660551243_.jpg" class="d-block w-100" alt="..." />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Banner;