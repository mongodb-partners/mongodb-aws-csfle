import React from 'react';
import Slider from "react-slick";
import Title from "./title";
import '../../scss/components/slider.scss';

function SimpleSlider({promotionData}) {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        centerPadding: '0px'
    };

    return(
        <div className="promotionframe">
            <div className="promotiongroup">
                <Title message="Useful Articles" />
                <Slider {...settings}>
                    {promotionData.map((item, index) => (
                        <div key={index} className="promotion">
                            <div className="promotionbanner">
                                <img src={'/images/' + item.banner} />
                            </div>
                            <div className="promotiondetail">
                                <p className="promotiontitle">
                                    {item.title}
                                </p>
                                <p className="promotionblog">
                                    {item.blog} <a target="blank" href={item.link}>Read More</a>
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default SimpleSlider;