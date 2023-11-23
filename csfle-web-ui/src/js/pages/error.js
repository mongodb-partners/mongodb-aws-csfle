import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, {useEffect} from 'react';
import {useIndex} from '../common/hook';
import {postAuditEntry} from "../common/common";
import Title from "../components/title";
import MetaTag from "../components/metatag";
import {NavLink} from "react-router-dom";
import {getSessionCookie} from "../common/session";
import '../../scss/pages/error.scss';

const pagetitle = 'Taleofddh Page Not Found';
const source = 'error';

function Error(props) {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const ddhomeCountry = getSessionCookie('ddhomeCountry');

    useEffect(() => {
        postAuditEntry(
            {
                date: new Date(),
                hostName: window.location.hostname,
                countryCode: ddhomeCountry.country_code,
                ipAddress: ddhomeCountry.ip_address,
                page: 'error',
                message: 'Error Page Accessed'
            }
        );
    }, []);

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="errorframe">
                        <Title message={pagetitle} />
                        <div className="errormessage">
                            <p>Your requested page is not available or the application has generated an error.</p>
                            <p>Please visit <NavLink to="/">Taleofddh Home Page</NavLink> to search for features</p>
                            <p>If you have any specific query please <NavLink to="/contact-us">Contact Us</NavLink>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;