import React from 'react';
import {useLocation} from "react-router";
import {useGet, useIndex} from "../common/hook";
import Title from "../components/title";
import MetaTag from "../components/metatag";
import Loader from "../components/loader";
import ViewProfile from "../components/viewprofile";
import '../../scss/pages/userprofile.scss';

const pagetitle = 'Get Customer with Key';
const source = 'get-customer-with-key';

function GetCustomerWithKey() {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [data, loading] = useGet(
        "getCustomerWithKey",
        "/getCustomerWithKey"
    );
    const location = useLocation();

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="userprofileframe">
                        <Title message={pagetitle} />
                        {loading ? (
                            <Loader loading={loading} />
                        ) : (
                            <ViewProfile data={data} source={source} docs={location.state}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetCustomerWithKey;