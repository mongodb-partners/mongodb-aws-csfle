import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import {useIndex} from '../common/hook';
import Title from "../components/title";
import MetaTag from "../components/metatag";
import {NavLink} from "react-router-dom";
import '../../scss/pages/error.scss';

const pagetitle = 'CSFLE Web UI Page Not Found';
const source = 'error';

function Error() {
    const index = useIndex(window.location.hostname, window.location.protocol);

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="errorframe">
                        <Title message={pagetitle} />
                        <div className="errormessagecontainer">
                            <p>Your requested page is not available or the application has generated an error.</p>
                            <p>Please visit <NavLink to="/">CSFLE Web UI Home Page</NavLink> to browse for features</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;