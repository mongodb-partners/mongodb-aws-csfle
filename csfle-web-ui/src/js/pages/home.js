import React from 'react';
import {useIndex} from "../common/hook";
import CSFLEService from "../components/csfleservice";
import Loader from "../components/loader";
import MetaTag from "../components/metatag";
import {SERVICE} from "../common/data";
import '../../scss/pages/home.scss';

const source = 'home';

function Home(props) {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [csfleServiceData, csfleServiceLoading] = [SERVICE, false];

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    {csfleServiceLoading ? (
                        <Loader loading={csfleServiceLoading} />
                    ) : (
                        <CSFLEService geolocationData={props.geolocationData} csfleServiceData={csfleServiceData} ddhomeCountryCallBack={props.ddhomeCountryCallBack}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;