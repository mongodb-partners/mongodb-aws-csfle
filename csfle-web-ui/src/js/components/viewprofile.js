import React from 'react';
import {getSessionCookie} from "../common/session";
import Countries from "../common/countries";
import Label from "./label";
import '../../scss/components/profile.scss';

function ViewProfile(props) {

    const customer = props.data;

    return (
        <>
            <div className="profilecontainer">
                <div className="profilefieldcontainer">
                    <Label name="First Name" label="First Name" required={false}/>
                    <Label name="1" label={customer ? customer.firstName : ''} required={false}/>
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Last Name" label="Last Name" required={false} />
                    <Label name="2" label={customer ? customer.lastName : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Date of Birth" label="Date of Birth" required={false} />
                    <Label name="3" label={customer ? customer.dateOfBirth : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Email" label="Email" required={false} />
                    <Label name="5" label={customer ? customer.email : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Address 1" label="Address 1" required={false} />
                    <Label name="6" label={customer ? customer.address1 : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Address 2" label="Address 2" required={false} />
                    <Label name="7" label={customer ? customer.address2 : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="City" label="City" required={false} />
                    <Label name="8" label={customer ? customer.city : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Post Code" label="Post Code" required={false} />
                    <Label name="9" label={customer ? customer.postCode : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Country" label="Country" required={false} />
                    <Label name="10" label={customer ? Countries[customer.countryCode] : Countries[getSessionCookie('ddhomeCountry').country_code]} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Phone" label="Phone" required={false} />
                    <Label name="11" label={customer ? customer.phone : ''} required={false} />
                </div>
                <div className="profilefieldcontainer">
                    <Label name="Mailing Flag" label="Mailing Flag" required={false} />
                    <Label name="12" label={customer ? customer.mailingFlag + '' : 'false'} required={false} />
                </div>
            </div>
        </>
    )
}

export default ViewProfile;