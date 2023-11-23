import React, { useState } from 'react';
import {Link, NavLink, useHistory} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import Icon from "../common/icon";
import '../../scss/components/responsivenavigation.scss';
import {useSessionContext} from "../common/session";
import {Auth} from "aws-amplify";

function ResponsiveNavigation(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    }

    const closeMenu = (clickEvent) => {
        setMenuOpen(false);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }


    return (
        <div className="mobilemenuwrapper" id="outer-container">
            <div className="right">
                <Menu right={true}
                      outerContainerId="outer-container"
                      width="280px"
                      burgerButtonClassName="burger-button"
                      burgerBarClassName="burger-bars"
                      crossButtonClassName="cross-button"
                      crossClassName="cross"
                      menuClassName="menu"
                      morphShapeClassName="morph-shape"
                      itemListClassName="item-list"
                      overlayClassName="overlay"
                      isOpen={menuOpen}
                      onStateChange={(state) => handleStateChange(state)}>
                    {props.menus.map((item, index) => {
                        return (
                            <label key={index} className="itemwrapper" onClick={closeMenu}>
                                <HamnburgerMenuItem menu={item} onClick={closeMenu}/>
                            </label>
                        )
                    })}
                </Menu>
            </div>
        </div>
    )

}

function HamnburgerMenuItem(props) {
    const { isAuthenticated, userHasAuthenticated } = useSessionContext();
    const history = useHistory();
    //var isActive = this.props.location.pathname === this.props.menu.link;
    var activeClassName;
    if(props.menu.link === '#') {
        activeClassName = '';
    } else {
        activeClassName = 'activeitem'
    }
    let exact = {};
    if(props.menu.link === '/') {
        exact = {"exact": true};
    }
    let visible = false;
    if(props.menu.condition === 'NA') {
        visible = true;
    } else if (props.menu.condition === 'No Auth' && !isAuthenticated) {
        visible = true;
    } else if (props.menu.condition === 'Auth' && isAuthenticated) {
        visible = true;
    } else {
        visible = false;
    }

    const handleLogout = async (clickEvent) => {
        clickEvent.preventDefault();
        await Auth.signOut();
        userHasAuthenticated(false);
        history.push("/sign-in");
    }

    return (
        visible && (<>
            {props.menu.external ? (
                <a href={props.menu.link} className="item">
                    <p className="menuitem">
                        <span className="menuitemicon">
                            <Icon name={props.menu.icon} fill="#431C5D" />
                        </span>
                        <span className="menuitemname">
                            &nbsp;&nbsp;&nbsp;
                            {props.menu.name}
                        </span>
                    </p>
                </a>
            ) : (
                <NavLink to={props.menu.link} aria-current="page" {...exact} activeClassName={activeClassName} className="item">
                    <p className="menuitem">
                        <span className="menuitemicon">
                            <Icon name={props.menu.icon} fill="#431C5D" />
                        </span>
                        {props.menu.name === 'Sign-out' ? (
                            <span className="menuitemname" onClick={handleLogout}>
                                &nbsp;&nbsp;&nbsp;
                                {props.menu.name}
                            </span>
                        ) : (
                            <span className="menuitemname">
                                &nbsp;&nbsp;&nbsp;
                                {props.menu.name}
                            </span>
                        )}

                    </p>
                </NavLink>
            )}
        </>)
    )

}

export default ResponsiveNavigation;