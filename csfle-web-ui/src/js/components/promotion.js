import React from 'react';
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import {useIndex, useGet} from "../common/hook";
import Loader from "./loader";
import {PROMOTION} from "../common/data";
import '../../scss/components/slider.scss';

function Promotion(props) {
    const [promotionData, promotionLoading] = [PROMOTION, false];

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
                {promotionLoading ? (
                    <Loader loading={promotionLoading}/>
                ) : (
                    <Slider {...settings}>
                        {promotionData.map((item, index) => (
                            <div key={index} className="promotion">
                                <NavLink to={item.link}>
                                    <div className="promotionbanner" style ={{backgroundImage: 'url("/images/promotions/' + item.image + '")', backgroundPositionX: 'center',
                                        backgroundPositionY: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                                        <p className="promotiontitle">
                                            {item.title}
                                        </p>
                                        <p className="promotionblog">
                                            {item.tagLine}
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    )
}

export default Promotion;