import React, {useEffect, useState} from 'react';
import {API} from 'aws-amplify';
import {onError} from "../common/error";
import {useFormFields} from "../common/hook";
import TypeInput from "./typeInput";
import LoaderButton from "./loaderbutton";
import Label from "./label";
import Radio from "./radio";
import '../../scss/components/stayconnected.scss';

function StayConnected(props) {
    let additionalQueryValues = [];
    if(props.isAdditionalEnqueries) {
        additionalQueryValues = props.stayConnectedEnqueries.map((item) => {
            return {...additionalQueryValues, sequence : item.sequence + '', enquiry: item.question, response : '', required: item.required}
        })
    }
    const [isLoading, setIsLoading] = useState(false);
    const [newSubscription, setNewSubscription] = useState(null);
    const [fields, handleFieldChange] = useFormFields({
        email : ''
    });
    const [stayConnectedEnquiryResponses, setStayConnectedEnquiryResponses] = useState(additionalQueryValues);

    useEffect(() => {
    }, []);

    const renderForm = () => {
        let marginTop;
        if(props.isAdditionalEnqueries) {
            marginTop = '12px';
        }
        return (
            <>
                <form key="StayConnectedForm" name="StayConnectedForm" onSubmit={submitSubscription}>
                    {props.isAdditionalEnqueries ? (
                        <div className="formcontainer">
                            {props.stayConnectedEnqueries.map((item) => (
                                <div className="fieldcontainer">
                                    {item.type.toUpperCase() === 'RADIO' ? (
                                        <>
                                            <div className="stayconnectedenquiryquestion">
                                                <Label id={item.sequence + ''}
                                                       name={item.question}
                                                       label={item.question}
                                                       disabled={false}
                                                       required={item.required} />
                                                {item.note !== '' ? (
                                                    <label className="stayconnectedenquirynote">
                                                        {'(' + item.note + ')'}
                                                    </label>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                            </div>
                                            <div className="stayconnectedenquiryoptions">
                                                {item.optionList.map((item1, index) => {
                                                    return (
                                                        <Radio key={index}
                                                               id={item.sequence + ''}
                                                               type={item.type}
                                                               name={item.question}
                                                               label={item1.choice}
                                                               value={item1.choice}
                                                               disabled={false}
                                                               required={false}
                                                               initialState={false}
                                                               onChange={handleAdditionalEnquriesChange}/>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="formcontainer">
                        <div className="fieldcontainer">
                            <TypeInput
                                id="1"
                                name="email"
                                label="Enter Your Email"
                                type="email"
                                disabled={false}
                                required={true}
                                initialValue=""
                                note="We will never spam your inbox"
                                value={fields.email}
                                placeHolder=""
                                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={handleFieldChange} />
                        </div>
                    </div>
                    <div className="connectedbuttoncontainer" style={{marginTop: marginTop}}>
                        <LoaderButton name="StayConnectedButton"
                                      label="Stay Connected"
                                      disabled={!validateForm}
                                      isLoading={isLoading}
                                      onClick={submitSubscription} />
                    </div>
                </form>
            </>
        );
    }

    const renderAcknowledgement = () => {
        return (
            <div className="subscriptionacknowledgementcontainer">
                <p>
                    <label className="subscriptionacknowledgement">
                        We are delighted that you chose to stay connected with us. We shall keep you informed about our roadmap and plan of launching new services.
                    </label>
                </p>
            </div>
        )
    }

    const handleAdditionalEnquriesChange = (changeEvent) => {
        let responsesDetails = [...stayConnectedEnquiryResponses];
        responsesDetails = responsesDetails.map((item) => {
            if(item.sequence === changeEvent.target.id && item.enquiry === changeEvent.target.name) {
                item.response = changeEvent.target.value
            }
            return item;
        })

        console.log("responsesDetails", responsesDetails);

        setStayConnectedEnquiryResponses(responsesDetails);
    }

    const submitSubscription = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log("email", fields.email);
        if(validateForm()) {
            setIsLoading(true);
            const init = {
                response: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: {
                    email: fields.email,
                    subscribed: true
                },
            }
            await API.post('updateSubscription', '/updateSubscription', init)
                .then(response => {
                    setIsLoading(false);
                    setNewSubscription(response.data);
                })
                .catch(error => {
                    onError(error);
                    setIsLoading(false);
                });

        } else {
            alert('Please complete mandatory field(s) correctly marked with *')
        }
    }

    const validateForm = () => {
        const emailRegex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
        let valid = true;
        if(props.isAdditionalEnqueries) {
            stayConnectedEnquiryResponses.map((item) => {
                if(item.required && item.response === '') {
                    valid = false;
                    console.log("In invalid response");
                }
                return valid;
            })
        }
        return valid
            && fields.email.match(emailRegex);
    }

    return(
        <div className="stayconnected">
            {newSubscription === null ? renderForm() : renderAcknowledgement()}
        </div>
    )
}

export default StayConnected;