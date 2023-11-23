import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth, API } from 'aws-amplify';
import {useFormFields} from "../common/hook";
import {useSessionContext, getSessionCookie, setSessionCookie} from "../common/session";
import {onError} from "../common/error";
import TypeInput from "../components/typeInput";
import LoaderButton from "./loaderbutton";
import FacebookButton from "./facebookbutton";
import GoogleButton from "./googlebutton";
import '../../scss/components/registration.scss';

function Registration(props) {
    const history = useHistory();
    const { userHasAuthenticated } = useSessionContext();
    const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState(null);

    const [fields, handleFieldChange] = useFormFields({
        username : '',
        password : '',
        confirmPassword: '',
        confirmationCode: ''
    });

    const submitRegistration = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log(fields.username);

        setIsLoading(true);
        try {
            const newUser = await Auth.signUp({
                username: fields.username,
                password: fields.password,
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            if (e.name === 'UsernameExistsException') {
                alert (e.message);
            } else {
                onError(e);
            }
            setIsLoading(false);
        }
    }

    const submitConfirmation = async (submitEvent) => {
        submitEvent.preventDefault();
        setIsLoading(true);
        try {
            await Auth.confirmSignUp(fields.username, fields.confirmationCode);
            await Auth.signIn(fields.username, fields.password);
            userHasAuthenticated(true);
            const credentials = await Auth.currentUserCredentials();
            setSessionCookie("credential", {identityId: credentials.identityId});
            await API.post("createUserProfile", "/createUserProfile", {
                response: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: {email: fields.username, identityId: credentials.identityId, updatedAt: new Date(), lastLogin: new Date()},
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    const validateForm = () => {
        const emailRegex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
        const passwordRegex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$');
        return fields.username.match(emailRegex)
            && fields.password.match(passwordRegex)
            && fields.password === fields.confirmPassword;
    }

    const validateConfirmationForm = () => {
        return fields.confirmationCode.length > 0;
    }

    const handleFederatedLogin = async (response) => {
        console.log(response);
    };

    const renderForm = () => {
        return (
            <form key="LoginForm" name="LoginForm" onSubmit={submitRegistration}>
                <div className="registrationbuttoncontainer">
                    <FacebookButton
                        onLogin={handleFederatedLogin} />
                </div>
                <div className="registrationbuttoncontainer">
                    <GoogleButton
                        onLogin={handleFederatedLogin} />
                </div>
                <hr />
                <div className="registrationcontainer">
                    <div className="registrationfieldcontainer">
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
                    <div className="registrationfieldcontainer">
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
                    <div className="registrationfieldcontainer">
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
                <div className="registrationbuttoncontainer">
                    <LoaderButton name="RegisterButton"
                                  type="submit"
                                  label="Register"
                                  disabled={!validateForm()}
                                  isLoading={isLoading}
                                  onClick={submitRegistration} />
                </div>
            </form>
        )
    }

    const renderConfirmationForm = () => {
        return (
            <>
                <form key="RegistrationForm" name="RegistrationForm" onSubmit={submitConfirmation}>
                    <div className="registrationcontainer">
                        <div className="registrationfieldcontainer">
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
                                       onChange={handleFieldChange} />
                        </div>
                    </div>
                    <div className="registrationbuttoncontainer">
                        <LoaderButton name="ConfirmCodeButton"
                                      type="submit"
                                      label="Confirm Code"
                                      disabled={!validateConfirmationForm()}
                                      isLoading={isLoading}
                                      onClick={submitConfirmation} />
                    </div>
                </form>
            </>
        )
    }

    return (
        <>
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </>
    )
}

export default Registration;