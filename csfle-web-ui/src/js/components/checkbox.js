import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../scss/components/checkbox.scss'

function CheckBox(props) {
    const [focused, setFocused] = useState(false);
    const [checked, setChecked] = useState(!!props.initialState);

    const onBlur = () => {
        setFocused(false);
    }

    const onFocus = () => {
        setFocused(true);
    }

    const handleChange = (event) => {
        props.onChange && props.onChange(event);
        setChecked(event.target.checked);
    }

    let styledClassName = 'styledcheckbox';
    let iconClassName = 'checkboxicon';
    if(focused === true) {
        styledClassName += ' focuscheckboxborder';
    }
    if(checked === true) {
        styledClassName += ' checkboxchecked';
        iconClassName += ' checkboxvisible';
    } else {
        styledClassName += ' checkboxunchecked';
        iconClassName += ' checkboxhidden';
    }

    let required = props.required ? '*' : '';

    return (
        <p className={`check ${props.className}`}>
            <label className="checkboxlabel">
                <span className="checkboxtext">{props.label}</span>
                <span className="required">{required}</span>
                <input // HiddenCheckbox
                    type='checkbox'
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    disabled={props.disabled}
                    required={props.required}
                    checked={checked}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    className="hidecheckbox" />
                <span // StyledCheckbox
                    checked={checked}
                    className={styledClassName}>
                    <svg // Icon
                        viewBox='0 0 18 18'
                        className={iconClassName}>
                        <polyline points='15 4 7 12 3 9' />
                    </svg>
                </span>
            </label>
        </p>
    )
}

CheckBox.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.bool,
    specialText: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

CheckBox.defaultProps = {
    type: 'checkbox',
    label: '',
    className: '',
    required: false,
    value: false,
    specialText: {},
    checked: false,
    onChange: () => {}
};

export default CheckBox;