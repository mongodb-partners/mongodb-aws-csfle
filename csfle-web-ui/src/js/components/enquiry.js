import React from 'react';
import { withRouter } from 'react-router-dom';
import {useIndex, useFormFields} from "../common/hook";
import {getSessionCookie} from "../common/session";
import TypeInput from "../components/typeInput";
import TextArea from "../components/textarea";
import Button from "../components/button";
import '../../scss/components/enquiry.scss';
import '../../scss/components/popup.scss';

function Enquiry(props) {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const ddhomeCountry = getSessionCookie('ddhomeCountry');

    const [fields, handleFieldChange] = useFormFields({
        name : '',
        email : '',
        phone : '',
        enquiry : ''
    });

    const submitEnquiry = (submitEvent) => {
        submitEvent.preventDefault();
        console.log(fields.name, fields.email, fields.phone, fields.enquiry);

        let request = {
            type: props.type,
            countryCode: ddhomeCountry.country_code,
            requestor: fields.name,
            email: fields.email,
            phone: fields.phone,
            enquiry: fields.enquiry
        }

        props.history.push('/' + props.source + '-acknowledgement', {
            source: props.source,
            index: index,
            request: request
        });

    }

    const validateForm = () => {
        const nameRegex = RegExp('^[A-Za-z0-9 ]{1,50}$');
        const emailRegex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
        const phoneRegex = RegExp('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]{8,}$');
        return fields.name.match(nameRegex)
            && fields.email.match(emailRegex)
            && (fields.phone.length === 0 || (fields.phone.length > 0 && fields.phone.match(phoneRegex)))
            && fields.enquiry.length > 0;
    }

    return (
        <>
            <div className="enquirycontainer">
                <form key="EnquiryForm" name="EnquiryForm" onSubmit={submitEnquiry}>
                    <div className="enquiryfieldcontainer">
                        <TypeInput id="1"
                                   name="name"
                                   label="Name"
                                   type="text"
                                   disabled={false}
                                   required={true}
                                   maxLength={50}
                                   initialValue=""
                                   value={fields.name}
                                   placeHolder="e.g. John Smith"
                                   pattern="^[A-Za-z0-9 ]{1,50}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="enquiryfieldcontainer">
                        <TypeInput id="2"
                                   name="email"
                                   label="Email"
                                   type="email"
                                   disabled={false}
                                   required={true}
                                   initialValue=""
                                   value={fields.email}
                                   placeHolder="e.g. email@domain.com"
                                   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="enquiryfieldcontainer">
                        <TypeInput id="3"
                                   name="phone"
                                   type="tel"
                                   label="Phone"
                                   disabled={false}
                                   required={false}
                                   initialValue=""
                                   value={fields.phone}
                                   placeHolder="+XX XXX XXX-XXXX"
                                   pattern="^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]{8,}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="enquiryfieldcontainer">
                        <TextArea id="4"
                                  name="enquiry"
                                  label="Message"
                                  disabled={false}
                                  required={true}
                                  initialValue=""
                                  value={fields.enquiry}
                                  placeHolder="Type your query/message"
                                  onChange={handleFieldChange} />
                    </div>
                </form>
            </div>
            <div className="enquirybuttoncontainer">
                <Button name="SubmitEnquiryButton"
                        type="submit"
                        label="Submit"
                        disabled={!validateForm()}
                        onClick={submitEnquiry} />
            </div>
        </>
    )
}

export default withRouter(Enquiry);