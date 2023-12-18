import React from 'react';
import {useLocation} from "react-router";
import {useIndex, usePost} from "../common/hook";
import {getSessionCookie} from "../common/session";
import Title from "../components/title";
import MetaTag from "../components/metatag";
import Loader from "../components/loader";
import View from "../components/view";
import '../../scss/pages/userprofile.scss';

const pagetitle = 'Get Customer No Key';
const source = 'get-customer-no-key';

function GetCustomerNoKey() {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [data, loading] = usePost(
        "getCustomerNoKey",
        "/getCustomerNoKey",
        {
            identityId: getSessionCookie("credential").identityId,
            email: getSessionCookie("credential").email
        }
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
                            <View data={data} source={source} docs={location.state}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetCustomerNoKey;