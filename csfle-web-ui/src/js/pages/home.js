import React, {useEffect} from 'react';
import { NavLink } from "react-router-dom";
import {getSessionCookie} from "../common/session";
import {useIndex} from "../common/hook";
import CountryServEase from "../components/csfleservice";
import Loader from "../components/loader";
//import {postAuditEntry} from "../common/common";
import MetaTag from "../components/metatag";
import {SERVICE} from "../common/data";
import '../../scss/pages/home.scss';

const source = 'home';

function Home(props) {
    const index = useIndex(window.location.hostname, window.location.protocol);
    //const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const [countryServEasesData, countryServEasesLoading] = [SERVICE, false];

    /*useEffect(() => {
        postAuditEntry(
            {
                date: new Date(),
                countryCode: ddhomeCountry.country_code,
                hostName: window.location.hostname,
                ipAddress: ddhomeCountry.ip_address,
                page: 'home',
                message: 'Home Page Accessed'
            }
        );
    }, []);*/

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    {countryServEasesLoading ? (
                        <Loader loading={countryServEasesLoading} />
                    ) : (
                        <CountryServEase geolocationData={props.geolocationData} countryServEasesData={countryServEasesData} ddhomeCountryCallBack={props.ddhomeCountryCallBack}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;