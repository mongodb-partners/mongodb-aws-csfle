import React from 'react';
import {useIndex} from "../common/hook";
import Title from "../components/title";
import MetaTag from "../components/metatag";
import Login from "../components/login";
import '../../scss/pages/signin.scss';

const pagetitle = 'Sign in';
const source = 'sign-in';

function SignIn() {
    const index = useIndex(window.location.hostname, window.location.protocol);

    return (
        <>
            <MetaTag page={source} index={index} url={window.location.protocol + '//'  + window.location.hostname} />
            <div className="boxouter">
                <div className="container">
                    <div className="signinframe">
                        <Title message={pagetitle} />
                        <Login source={source} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;