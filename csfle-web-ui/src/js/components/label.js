import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../../scss/components/label.scss'

function Label(props) {

    let required;
    if(props.required) {
        required = '*';
    } else {
        required = '';
    }

    return (
        <div className={`lbl ${props.className}`}>
            <label>
                {props.label}
                <span className="required">{required}</span>
            </label>
        </div>
    )
}

Label.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool
};

Label.defaultProps = {
    label: '',
    className: '',
    required: true
};

export default Label;