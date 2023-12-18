import React, {useEffect, useState} from 'react';
import { NavLink, useHistory } from "react-router-dom";
import {Auth} from "aws-amplify";
import {removeSessionCookie, useSessionContext} from "../common/session";
import {onError} from "../common/error";
import Icon from "../common/icon";
import '../../scss/components/header.scss';

function Header(props) {
    const history = useHistory();
    const { isAuthenticated, userHasAuthenticated } = useSessionContext();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    //let count = 0;
    //console.log(props.menus);

    useEffect(() => {
        onLoad();
    }, [])

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                onError(e);
            }
        }
        setIsAuthenticating(false);
    }
/*    let menusIcon = props.menus.map((item, index) => {
        let separator = '   ';
        if(item.position === 'Header') {
            count++
            return (
                <NavLink key={index} to={item.link}>
                    {count > 1 ? (
                        <>
                            {separator}
                            <p className="headericon">
                                <Icon name={item.icon} fill = "#FFFFFF" />
                            </p>
                        </>
                    ) : (
                        <p className="headericon">
                            <Icon name={item.icon} fill = "#FFFFFF" />
                        </p>
                    )}
                </NavLink>
            )
        }
    });*/
/*    let menusIcon =
        isAuthenticated ? (
            <NavLink to="/edit-customer-csfle">
                <p className="headericon">
                    <Icon name="user" fill = "#FFFFFF" />
                </p>
            </NavLink>
        ) : (
            <NavLink to="/sign-in">
                <p className="headericon">
                    <Icon name="user" fill = "#FFFFFF" />
                </p>
            </NavLink>
        )*/

/*    count = 0;
    let menusText = props.menus.map((item, index) => {
        if(item.position === 'Header') {
            let separator = '   |   ';
            let name = item.name;
            let link = item.link;
            if(item.name === 'Sign-in') {
                if(isAuthenticated) {
                    name = 'Sign-out'
                    link = '/sign-out';
                }
            }
            count++
            return (
                <NavLink key={index} to={link}>
                    {count > 1 ? separator + name : name}
                </NavLink>
            )
        }
    });*/
/*    let menusText =
        isAuthenticated ? (
            <>
                <label className="signintext" onClick={handleLogout}>
                        Sign-out
                </label>
                <NavLink to="/edit-customer-csfle">
                    <p className="headericon">
                        <Icon name="user" fill = "#FFFFFF" />
                    </p>
                </NavLink>&nbsp;&nbsp;
            </>
        ) : (
            <label className="signintext">
                <NavLink to="/sign-in">
                    Sign-in
                </NavLink>
            </label>
        )*/

    const handleLogout = async (clickEvent) => {
        clickEvent.preventDefault();
        await Auth.signOut();
        userHasAuthenticated(false);
        removeSessionCookie("credential");
        history.push("/sign-in");
    }

    return (
        !isAuthenticating && (
        <div className="headerbar">
            <div className="container">
                <div className="header">
                    <div className="servicelogo">
                        <NavLink to="/">
                            {/*<img src="/images/heritagebank-banner.png" alt="Tale of DDH"/>*/}
                            <div className="logoshape">
                                <span className="logotext">CSFLE Web UI</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="signin">
                        {isAuthenticated ? (
                            <>
                                <label className="signintext" onClick={handleLogout}>
                                    Sign-out
                                </label>
                                <NavLink to="/edit-customer-csfle">
                                    <p className="headericon">
                                        <Icon name="user" fill = "#FFFFFF" />
                                    </p>
                                </NavLink>&nbsp;&nbsp;
                            </>
                        ) : (
                            <label className="signintext">
                                <NavLink to="/sign-in">
                                    Sign-in
                                </NavLink>
                            </label>
                        )}
                    </div>
                    <div className="signinicon">
                        {isAuthenticated ? (
                            <NavLink to="/edit-customer-csfle">
                                <p className="headericon">
                                    <Icon name="user" fill = "#FFFFFF" />
                                </p>
                            </NavLink>
                        ) : (
                            <NavLink to="/sign-in">
                                <p className="headericon">
                                    <Icon name="user" fill = "#FFFFFF" />
                                </p>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    )

}

export default Header;