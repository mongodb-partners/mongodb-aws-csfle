import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { NavLink } from "react-router-dom";
import {useIndex, useFormFields} from "../common/hook";
import {postAuditEntry} from "../common/common";
import { onError } from "../common/error";
import TypeInput from "../components/typeInput";
import MetaTag from "../components/metatag";
import Title from "../components/title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderButton from "../components/loaderbutton";
import {getSessionCookie} from "../common/session";
import "../../scss/pages/resetpassword.scss";

const pagetitle = 'Reset Password';
const source = 'reset-password';

function ResetPassword(props) {
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [fields, handleFieldChange] = useFormFields({
        username: '',
        confirmationCode: '',
        password: '',
        confirmPassword: '',
    });
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);
    const ddhomeCountry = getSessionCookie('ddhomeCountry');

    useEffect(() => {
        postAuditEntry(
            {
                date: new Date(),
                hostName: window.location.hostname,
                countryCode: ddhomeCountry.country_code,
                ipAddress: ddhomeCountry.ip_address,
                page: 'reset password',
                message: 'Reset Password Page Accessed'
            }
        );
    }, [])

    const handleSendCodeClick = async (event) => {
        event.preventDefault();
        setIsSendingCode(true);
        try {
            await Auth.forgotPassword(fields.username);
            setCodeSent(true);
        } catch (error) {
            onError(error);
            setIsSendingCode(false);
        }
    }

    const handleConfirmClick = async (event) => {
        event.preventDefault();
        setIsConfirming(true);
        try {
            await Auth.forgotPasswordSubmit(
                fields.username,
                fields.confirmationCode,
                fields.password
            );
            setConfirmed(true);
        } catch (error) {
            onError(error);
            setIsConfirming(false);
        }
    }

    const validateCodeForm = () => {
        return fields.username.length > 0;
    }

    const validateResetForm = () => {
        return (
            fields.confirmationCode.length > 0
            && fields.password.length > 0
            && fields.password === fields.confirmPassword
        )
    }

    const renderRequestCodeForm = () => {
        return (
            <form key="ResetPasswordForm" name="ResetPasswordForm" onSubmit={handleSendCodeClick}>
                <div className="resetpasswordcontainer">
                    <div className="resetpasswordfieldcontainer">
                        <TypeInput id="1"
                                   name="username"
                                   label="Username"
                                   type="email"
                                   disabled={false}
                                   required={true}
                                   maxLength={50}
                                   initialValue=""
                                   value={fields.username}
                                   placeHolder=""
                                   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                   onChange={handleFieldChange} />
                    </div>
                </div>
                <div className="resetpasswordbuttoncontainer">
                    <LoaderButton name="ResetPasswordButton"
                                  type="submit"
                                  label="Send Confirmation"
                                  disabled={!validateCodeForm()}
                                  isLoading={isSendingCode} />
                </div>
            </form>
        );
    }

    const renderConfirmationForm = () => {
        return (
            <form key="ConfirmationCodeForm" name="ConfirmationCodeForm" onSubmit={handleConfirmClick}>
                <div className="resetpasswordcontainer">
                    <div className="resetpasswordfieldcontainer">
                        <TypeInput id="1"
                                   name="confirmationCode"
                                   label="Confirmation Code"
                                   type="number"
                                   disabled={false}
                                   required={true}
                                   maxLength={20}
                                   initialValue=""
                                   value={fields.confirmationCode}
                                   placeHolder=""
                                   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                   note={'Please check your email ' + fields.username + ' for the confirmation code.'}
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="resetpasswordfieldcontainer">
                        <TypeInput id="2"
                                   name="password"
                                   label="Password"
                                   type="password"
                                   disabled={false}
                                   required={true}
                                   initialValue=""
                                   value={fields.password}
                                   placeHolder=""
                                   pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
                                   onChange={handleFieldChange} />
                    </div>
                    <div className="resetpasswordfieldcontainer">
                        <TypeInput id="3"
                                   name="confirmPassword"
                                   label="Confirm Password"
                                   type="password"
                                   disabled={false}
                                   required={true}
                                   initialValue=""
                                   value={fields.confirmPassword}
                                   placeHolder=""
                                   pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
                                   onChange={handleFieldChange} />
                    </div>
                </div>
                <div className="resetpasswordbuttoncontainer">
                    <LoaderButton name="ConfirmButton"
                                  type="submit"
                                  label="Confirm"
                                  disabled={!validateResetForm()}
                                  isLoading={isConfirming} />
                </div>
            </form>
        );
    }

    function renderSuccessMessage() {
        return (
            <div className="resetpasswordcontainer">
                <div className="success">
                    <p>
                        <span style={{color: 'rgb(253, 204, 13)', fontSize: '1.3.rem'}}><FontAwesomeIcon icon="thumbs-up" /></span>&nbsp;&nbsp;Your password has been reset.
                    </p>
                    <p>
                        Click <NavLink to="/sign-in">here</NavLink> to login with your new credentials.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="resetpasswordframe">
                        <Title message={pagetitle} />
                        {!codeSent
                            ? renderRequestCodeForm()
                            : !confirmed
                                ? renderConfirmationForm()
                                : renderSuccessMessage()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
