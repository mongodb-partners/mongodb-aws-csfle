import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { BsArrowRepeat } from "react-icons/bs";
import '../../scss/components/loaderbutton.scss';

function LoaderButton(props) {
    const [focused, setFocused] = useState(false);

    const onBlur = () => {
        setFocused(false);
    }

    const onFocus = () => {
        setFocused(true);
    }

    const handleClick = (event) => {
        props.onClick && props.onClick(event);
    }
    let icon
    if(props.icon) {
        icon =
            <>
                <FontAwesomeIcon icon={['fab', props.icon]} />&nbsp;&nbsp;
            </>
    }

    return (
        <div
            tabIndex={0}
            id={props.id}
            name={props.name}
            className="loaderbutton"
            ref={props.ref}
            defaultValue={props.label}
            className={`loaderbutton ${props.className}`}
            title={props.title}>
            <button type={props.type}
                    disabled={props.disabled || props.isLoading}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={handleClick}>
                {props.isLoading && <BsArrowRepeat className="spinning" />}
                {icon}{props.label}
            </button>
        </div>
    )
}

LoaderButton.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool
};

LoaderButton.defaultProps = {
    label: '',
    title: '',
    onClick: () => {},
    className: '',
    disabled: false
};

export default LoaderButton;