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
import '../../scss/components/profile.scss';
import '../../scss/components/popup.scss';

function Profile(props) {
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
        about: profile.about,
        mailingFlag: profile.mailingFlag
    });

    const [form, setForm] = useState({
        communityList: profile.communityList
    });

    const handleChildCheckboxChange = (changeEvent) => {
        let communities = form.communityList;
        communities = communities.map((item) => {
            if(item.id === parseInt(changeEvent.target.id) && item.name === changeEvent.target.name) {
                return {...item, checked: changeEvent.target.checked}
            }
            return item;
        })
        setForm(form => ({...form, communityList: communities}));
    }

    const submitProfileUpdate = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log(fields.gender)
        setIsLoading(true);
        let profile = {
            identityId: getSessionCookie("credential").identityId,
            firstName : fields.firstName,
            lastName: fields.lastName,
            dateOfBirth: new Date(fields.dateOfBirth),
            gender: fields.gender,
            address1: fields.address1,
            address2: fields.address2,
            city: fields.city,
            postCode: fields.postCode,
            countryCode: fields.countryCode,
            phone: fields.phone,
            about: fields.about,
            communityList: form.communityList,
            mailingFlag: fields.mailingFlag,
            updatedAt: new Date()
        }
        console.log(JSON.stringify(profile));

        try {
            await API.put(
                "updateUserProfile",
                "/updateUserProfile",
                {
                    response: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: profile
                }
            );
            setIsLoading(false);
            alert("Your profile is successfully updated");
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
            && fields.about.length > 0;
    }

    return (
        <>
            <form key="ProfileForm" name="ProfileForm" onSubmit={submitProfileUpdate}>
                <div className="profilebuttoncontainer">
                    <NavLink to="/change-password">
                        <LoaderButton name="ChangePasswordButton"
                                      label="Change Password" />
                    </NavLink>
                </div>
                <div className="profilecontainer">
                    <div className="profilefieldcontainer">
                        <TypeInput id="1"
                                   name="firstName"
                                   label="First Name"
                                   type="text"
                                   disabled={false}
                                   required={false}
                                   maxLength={25}
                                   initialValue={fields.firstName}
                                   value={fields.firstName}
                                   placeHolder="e.g. John"
                                   pattern="^[A-Za-z0-9 ]{1,50}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="2"
                                   name="lastName"
                                   label="Last Name"
                                   type="text"
                                   disabled={false}
                                   required={false}
                                   maxLength={25}
                                   initialValue={fields.lastName}
                                   value={fields.lastName}
                                   placeHolder="e.g. Smith"
                                   pattern="^[A-Za-z0-9 ]{1,50}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="3"
                                   name="dateOfBirth"
                                   label="Date of Birth"
                                   type="date"
                                   disabled={false}
                                   required={false}
                                   initialValue={fields.dateOfBirth}
                                   value={fields.dateOfBirth}
                                   placeHolder="e.g. Smith"
                                   pattern="^[A-Za-z0-9 ]{1,50}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <p style={{margin: '0 auto', paddingBottom: '5px'}}>Gender</p>
                        <ul style={{listStyle: 'none', margin: '0 auto', padding: '0px'}}>
                            {genders.map((item, index) => (
                                <li key={index} style={{display: 'inline'}}>
                                    <Radio id={item.sequence + ''}
                                           name="gender"
                                           label={item.label}
                                           disabled={false}
                                           required={false}
                                           value={item.value}
                                           checked={fields.gender === item.value}
                                           onChange={handleFieldChange} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="5"
                                   name="email"
                                   label="Email"
                                   type="email"
                                   disabled={true}
                                   required={false}
                                   initialValue={fields.email}
                                   value={fields.email}
                                   placeHolder="e.g. email@domain.com"
                                   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="6"
                                   name="address1"
                                   label="Address 1"
                                   type="text"
                                   disabled={false}
                                   required={false}
                                   maxLength={50}
                                   initialValue={fields.address1}
                                   value={fields.address1}
                                   placeHolder="e.g. House No. Street"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="7"
                                   name="address2"
                                   label="Address 2"
                                   type="text"
                                   disabled={false}
                                   required={false}
                                   maxLength={50}
                                   initialValue={fields.address2}
                                   value={fields.address2}
                                   placeHolder="e.g. Area, Locality"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="8"
                                   name="city"
                                   label="City"
                                   type="text"
                                   disabled={false}
                                   required={false}
                                   maxLength={50}
                                   initialValue={fields.city}
                                   value={fields.city}
                                   placeHolder="e.g. London"
                                   pattern="^[A-Za-z0-9 ]{1,50}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="9"
                                   name="postCode"
                                   label="Post Code"
                                   type="text"
                                   disabled={false}
                                   required={false}
                                   maxLength={20}
                                   initialValue={fields.postCode}
                                   value={fields.postCode}
                                   placeHolder="e.g. 111111"
                                   pattern="^[A-Za-z0-9 ]{1,50}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <Select id="10"
                                name="countryCode"
                                disabled={false}
                                required={false}
                                label="Country"
                                defaultOption={defaultCountryOpt}
                                options={countryOpts}
                                value={fields.countryCode}
                                onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TypeInput id="11"
                                   name="phone"
                                   type="tel"
                                   label="Phone"
                                   disabled={false}
                                   required={false}
                                   initialValue={fields.phone}
                                   value={fields.phone}
                                   placeHolder="+XX XXX XXX-XXXX"
                                   pattern="^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]{8,}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <TextArea id="12"
                                  name="about"
                                  label="About Yourself"
                                  disabled={false}
                                  required={false}
                                  initialValue={fields.about}
                                  value={fields.about}
                                  placeHolder="About Yourself"
                                  onChange={handleFieldChange} />
                    </div>
                    <div className="profilefieldcontainer">
                        <p style={{margin: '0 auto', paddingBottom: '5px'}}>Community</p>
                        <ul style={{listStyle: 'none', margin: '0 auto', padding: '0px'}}>
                            {form.communityList.map((item, index) => (
                                <li key={index} style={{display: 'inline'}}>
                                    <CheckBox id={item.id + ''}
                                              name={item.name}
                                              label={item.name}
                                              disabled={false}
                                              required={false}
                                              initialState={item.checked}
                                              value={item.checked}
                                              onChange={handleChildCheckboxChange} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="profilefieldcontainer">
                        <CheckBox id="16"
                                  name="mailingFlag"
                                  label="Would you like to join our mailing list?"
                                  value={fields.mailingFlag}
                                  disabled={false}
                                  required={false}
                                  initialState={fields.mailingFlag}
                                  onChange={handleFieldChange} />
                    </div>
                </div>
                <div className="profilebuttoncontainer">
                    <LoaderButton name="SubmitEnquiryButton"
                                  type="submit"
                                  label="Update Profile"
                                  disabled={!validateForm()}
                                  isLoading={isLoading} />
                </div>
            </form>
        </>
    )
}

export default Profile;