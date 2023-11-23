import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../scss/components/typeinput.scss'

function TypeInput(props) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(props.initialValue);

    const [keyDown, setKeyDown] = useState(true);

    const onBlur = () => {
        setFocused(false);
    }

    const onFocus = () => {
        setFocused(true);
    }

    const onKeyDown = (e) => {
        if(e.target.type === 'number') {
            setKeyDown(false);
        }
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

    let note;
    if(props.note) {
        note = <label className="inputnote">{'(' + props.note + ')'}</label>;
    } else {
        note = <></>
    }

    return (
        <p className={`type ${props.className}`}>
            <label>
                {props.label}
                <span className="required">{required}</span>
            </label>
            {note}
            <input
                tabIndex={0}
                type={props.type}
                id={props.id}
                name={props.name}
                ref={props.ref}
                placeholder={props.placeHolder}
                min={props.min}
                max={props.max}
                maxLength={props.maxLength}
                disabled={props.disabled}
                required={props.required}
                value={value}
                pattern={props.pattern}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                onChange={handleChange} />
        </p>
    )
}

TypeInput.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string,
    label: PropTypes.string,
    note: PropTypes.string,
    placeHolder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    min: PropTypes.string,
    max: PropTypes.string,
    maxLength: PropTypes.number,
    initialValue: PropTypes.string,
    value: PropTypes.string,
    pattern: PropTypes.string,
    onChange: PropTypes.func
};

TypeInput.defaultProps = {
    label: '',
    title: '',
    placeHolder: '',
    className: '',
    required: true,
    initialValue: '',
    value: '',
    onChange: () => {}
};

export default TypeInput;