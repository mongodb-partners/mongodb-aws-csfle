import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {API} from "aws-amplify";
import {dateFormatToString} from "../common/common";
import {useIndex, useFormFields} from "../common/hook";
import {getSessionCookie} from "../common/session";
import {onError} from "../common/error";
import countries from "../common/countries";
import TypeInput from "./typeInput";
import TextArea from "./textarea";
import CheckBox from "./checkbox";
import LoaderButton from "./loaderbutton";
import Select from "./select";
import Radio from "./radio";
import Countries from "../common/countries";
import '../../scss/components/profile.scss';
import '../../scss/components/popup.scss';
import Label from "./label";

function View(props) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const countryEntries = Object.entries(countries);
    let countryOpts = [];
    let i = 0;
    let defaultCountryOpt = {sequence: 0, value: "XX", label: "Select a Country"};
    for(const [code, name] of countryEntries) {
        i++;
        countryOpts = [...countryOpts, {"sequence": i, "value": code, "label": name}];
    }
    const genders = [
        {sequence: 1, value: 'Male', label: 'Male'},
        {sequence: 2, value: 'Female', label: 'Female'},
        {sequence: 3, value: 'Preferred not to say', label: 'Preferred not to say'}
    ]
    const profile = props.data;

    const [fields, handleFieldChange] = useFormFields({
        firstName : profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: dateFormatToString(new Date(profile.dateOfBirth)),
        gender: profile.gender,
        email : profile.email,
        address1: profile.address1,
        address2: profile.address2,
        city: profile.city,
        postCode: profile.postCode,
        countryCode: profile.countryCode,
        phone: profile.phone,
        mailingFlag: profile.mailingFlag
    });

    const submitApplication = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log(fields.gender)
        setIsLoading(true);
        let application = {
            identityId: getSessionCookie("credential").identityId,
            firstName : fields.firstName,
            lastName: fields.lastName,
            dateOfBirth: new Date(fields.dateOfBirth),
            gender: fields.gender,
            email: fields.email,
            address1: fields.address1,
            address2: fields.address2,
            city: fields.city,
            postCode: fields.postCode,
            countryCode: fields.countryCode,
            phone: fields.phone,
            mailingFlag: fields.mailingFlag
        }
        console.log(JSON.stringify(application));

        try {
            await API.post(
                "saveCustomerCSFLE",
                "/saveCustomerCSFLE",
                {
                    response: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: application
                }
            );
            setIsLoading(false);
            alert("Your application is successfully updated");
        } catch (error) {
            onError(error);
            setIsLoading(false);
        }
    }

    const validateForm = () => {
        const nameRegex = RegExp('^[A-Za-z0-9 ]{1,50}$');
        const emailRegex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');
        const phoneRegex = RegExp('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]{8,}$');
        return fields.firstName.match(nameRegex)
            && fields.email.match(emailRegex)
            && (fields.phone.length === 0 || (fields.phone.length > 0 && fields.phone.match(phoneRegex)))
    }

    return (
        <>
            <form key="ProfileForm" name="ProfileForm" onSubmit={submitApplication}>
                <div className="profilecontainer">
                    <div className="profilefieldcontainer">
                        <Label name="First Name" label="First Name" required={false}/>
                        <Label name="1" label={props.customer.firstName} required={false}/>
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Last Name" label="Last Name" required={false} />
                        <Label name="2" label={props.customer.lastName} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Date of Birth" label="Date of Birth" required={false} />
                        <Label name="3" label={props.customer.dateOfBirth} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Gender" label="Gender" required={false} />
                        <Label name="4" label={props.customer.gender} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Email" label="Email" required={false} />
                        <Label name="5" label={props.customer.email} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Address 1" label="Address 1" required={false} />
                        <Label name="6" label={props.customer.address1} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Address 2" label="Address 2" required={false} />
                        <Label name="7" label={props.customer.address2} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="City" label="City" required={false} />
                        <Label name="8" label={props.customer.city} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Post Code" label="Post Code" required={false} />
                        <Label name="9" label={props.customer.postCode} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Country" label="Country" required={false} />
                        <Label name="10" label={Countries[props.customer.countryCode]} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Phone" label="Phone" required={false} />
                        <Label name="11" label={props.customer.phone} required={false} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Label name="Mailing Flag" label="Mailing Flag" required={false} />
                        <Label name="12" label={'' + props.customer.mailingFlag} required={false} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default View;