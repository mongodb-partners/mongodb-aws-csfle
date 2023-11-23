import React, {useState, useEffect} from "react";
import {API, Auth} from "aws-amplify";
import LoaderButton from "./loaderbutton";

function FacebookButton(props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await Auth.federatedSignIn(
                { provider: "Facebook" }
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
            name="FacebookButton"
            className="facebook"
            label="Login with Facebook"
            disabled={isLoading}
            icon="facebook-f"
            onClick={handleClick} />
    );
}

export default FacebookButton;