import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../scss/components/select.scss';

function Select(props) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(props.value);

    const onBlur = () => {
        setFocused(false);
    }

    const onFocus = () => {
        setFocused(true);
    }

    const handleChange = (event) => {
        props.onChange && props.onChange(event);
        setValue(event.target.value);
    }

    let required;
    if(props.required) {
        required = '*';
    } else {
        required = '';
    }

    let defaultOption;
    if(props.defaultOption) {
        defaultOption =
            <option key={props.defaultOption.sequence} value={props.defaultOption.value}>
                {props.defaultOption.label}
            </option>
    }

    let options = props.options.map((item) =>
        <option key={item.sequence} value={item.value}>
            {item.label}
        </option>
    );

    return (
        <p className={`select ${props.className}`}>
            <label className="selectlabel">
                {props.label}
                <span className="required">{required}</span>
            </label>
            <select
                tabIndex={0}
                id={props.id}
                name={props.name}
                ref={props.ref}
                disabled={props.disabled}
                required={props.required}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}>
                {defaultOption}
                {options}
            </select>
        </p>
    )
}

Select.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.string,
    defaultOption: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func
};

Select.defaultProps = {
    label: '',
    className: '',
    required: false,
    value: '',
    options: [],
    onChange: () => {}
};

export default Select;