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

const pagetitle = 'Save Customer CSFLE';
const source = 'save-customer-csfle';

function SaveCustomerCSFLE() {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [data, loading] = usePost(
        "findUserProfile",
        "/findUserProfile",
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
                page: 'Save Customer CSFLE',
                message: 'Save Customer CSFLE Page Accessed by ' + getSessionCookie("credential").identityId
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
                        {loading ? (
                            <Loader loading={loading} />
                        ) : (
                            <Application data={data} source={source} docs={location.state}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaveCustomerCSFLE;