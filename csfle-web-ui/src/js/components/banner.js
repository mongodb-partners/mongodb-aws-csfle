import React from 'react';
import {NavLink, Link} from "react-router-dom";
import {getSessionCookie, getSessionStorage} from "../common/session";
import '../../scss/components/banner.scss'

function Banner(props) {
    let count = 0;
    const ddhomeCountry = getSessionCookie('ddhomeCountry');
    let countryCode;
    if(props.country.country_code !== undefined) {
        countryCode = props.country.country_code;
    } else if(Object.keys(ddhomeCountry).length !== 0 || ddhomeCountry.constructor !== Object) {
        countryCode = ddhomeCountry.country_code;
    } else {
        let geolocationData = getSessionStorage('geolocation');
        countryCode = geolocationData.country_code;
    }

    return (
        <div className="bannerbar">
            <div className="banner">
                <p>
                    <label className="bannertext">
                        Find local and cross border services in 3 steps ! We are currently offering select services in <img src="/images/flags/GB.png" />&nbsp;<img src="/images/flags/IN.png" />
                    </label>
                </p>
            </div>
        </div>
    )
}

export default Banner;