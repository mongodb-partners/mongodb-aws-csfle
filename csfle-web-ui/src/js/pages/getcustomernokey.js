import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router";
import {useIndex, usePost} from "../common/hook";
import {getSessionCookie} from "../common/session";
import Title from "../components/title";
import MetaTag from "../components/metatag";
import Profile from "../components/profile";
import Loader from "../components/loader";
//import {postAuditEntry} from "../common/common";
import '../../scss/pages/userprofile.scss';
import Application from "../components/application";
import View from "../components/view";

const pagetitle = 'Get Customer No Key';
const source = 'get-customer-no-key';

function GetCustomerNoKey() {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [data, loading] = usePost(
        "findUserProfile",
        "/findUserProfile",
        {
            identityId: getSessionCookie("credential").identityId
        }
    );
    const [customer, customerLoading] = usePost(
        "getCustomerNoKey",
        "/getCustomerNoKey",
        {
            identityId: getSessionCookie("credential").identityId
        }
    );
    //const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const location = useLocation();
    const history = useHistory();

    /*useEffect(() => {
        postAuditEntry(
            {
                date: new Date(),
                countryCode: ddhomeCountry.country_code,
                hostName: window.location.hostname,
                ipAddress: ddhomeCountry.ip_address,
                page: 'user profile',
                message: 'User Profile Page Accessed by ' + getSessionCookie("credential").identityId
            }
        );
    }, []);*/

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="userprofileframe">
                        <Title message={pagetitle} />
                        {loading || customerLoading ? (
                            <Loader loading={loading} />
                        ) : (
                            <View data={data} customer={customer} source={source} docs={location.state}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetCustomerNoKey;