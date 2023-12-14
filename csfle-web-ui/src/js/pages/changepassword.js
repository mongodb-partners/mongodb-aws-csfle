import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {useHistory} from "react-router-dom";
import {useIndex, useFormFields} from "../common/hook";
import { onError } from "../common/error";
import TypeInput from "../components/typeInput";
import MetaTag from "../components/metatag";
import Title from "../components/title";
import LoaderButton from "../components/loaderbutton";
import "../../scss/pages/changepassword.scss";

const pagetitle = 'Change Password';
const source = 'change-password';

function ChangePassword(props) {
    const history = useHistory();
    const index = useIndex(window.location.hostname, window.location.protocol);
    const [fields, handleFieldChange] = useFormFields({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });
    const [isChanging, setIsChanging] = useState(false);

    const handleChangeClick = async (event) => {
        event.preventDefault();
        setIsChanging(true);
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(
                currentUser,
                fields.oldPassword,
                fields.password
            );
            alert("Password has been successfully changed");
            history.push("/edit-customer-csfle");
            setIsChanging(true);
        } catch (error) {
            onError(error);
            setIsChanging(false);
        }
    }

    const validateForm = () => {
        return (
            fields.oldPassword.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="changepasswordframe">
                        <Title message={pagetitle} />
                        <form key="ChangePasswordForm" name="ChangePasswordForm" onSubmit={handleChangeClick}>
                            <div className="changepasswordcontainer">
                                <div className="changepasswordfieldcontainer">
                                    <TypeInput id="1"
                                               name="oldPassword"
                                               label="Old Password"
                                               type="password"
                                               disabled={false}
                                               required={true}
                                               initialValue=""
                                               value={fields.oldPassword}
                                               placeHolder=""
                                               pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
                                               onChange={handleFieldChange} />
                                </div>
                                <div className="changepasswordfieldcontainer">
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
                                <div className="changepasswordfieldcontainer">
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
                            <div className="changepasswordbuttoncontainer">
                                <LoaderButton name="ChangeButton"
                                              type="submit"
                                              label="Change"
                                              disabled={!validateForm()}
                                              isLoading={isChanging} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
