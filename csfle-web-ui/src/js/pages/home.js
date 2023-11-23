import React, {useEffect} from 'react';
import { NavLink } from "react-router-dom";
import {getSessionCookie} from "../common/session";
import {useIndex} from "../common/hook";
import CountryServEase from "../components/countryservease";
import Loader from "../components/loader";
import {postAuditEntry} from "../common/common";
import MetaTag from "../components/metatag";
import CollapseText from "../components/collapsetext";
import Promotion from "../components/promotion";
import StayConnected from "../components/stayconnected";
import BlogSection from "../components/blogsection";
import SimpleSlider from "../components/slider";
import {PROMOTION, SERVICE} from "../common/data";
import '../../scss/pages/home.scss';

const source = 'home';

function Home(props) {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const [countryServEasesData, countryServEasesLoading] = [SERVICE, false];
    const [promotionData, promotionLoading] = [PROMOTION, false];

    const message = 'We are currently offering select services for customers in the United Kingdom. Over the coming months we aim to include more services and countries. ';
    const message2 = 'If you have any particular service requirement, that is not currently covered, please ';
    const message3 = 'We\'d be delighted to keep you informed about our roadmap and plan of launching new services. Please stay in touch with us.';

    useEffect(() => {
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
    }, []);

    const defaultMessage =
        <div className="messagecontainer">
            <div className="defaultmessage">
                <p>{message}</p>
                <p>{message2}<NavLink to="/contact-us">Contact Us</NavLink>.</p>
                <p>{message3}</p>
            </div>
            <StayConnected />
        </div>

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