import React, {useState, useEffect} from "react";
import {API, Auth} from "aws-amplify";
import LoaderButton from "./loaderbutton";

function GoogleButton(props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await Auth.federatedSignIn(
                { provider: "Google" }
            );
            setIsLoading(false);
            props.onLogin(response);
        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    }

    return (
        <LoaderButton
            bsSize="large"
            bsStyle="primary"
            name="GoogleButton"
            className="google"
            label="Login with Google"
            disabled={isLoading}
            icon="google"
            onClick={handleClick} />
    );
}

export default GoogleButton;