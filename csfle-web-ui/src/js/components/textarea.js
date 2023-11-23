import React, {useState } from 'react';
import PropTypes from 'prop-types';
import '../../scss/components/textarea.scss'

function TextArea(props) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(props.initialValue);

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

    return (
        <p className={`text ${props.className}`}>
            <label>
                {props.label}
                <span className="required">{required}</span>
            </label>
            <textarea
                tabIndex={0}
                id={props.id}
                name={props.name}
                ref={props.ref}
                placeholder={props.placeHolder}
                maxLength={props.maxLength}
                disabled={props.disabled}
                required={props.required}
                rows={props.rows}
                cols={props.cols}
                title={props.title}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange} />
        </p>
    )
}

TextArea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    placeHolder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    rows: PropTypes.number,
    cols: PropTypes.number,
    maxLength: PropTypes.number,
    initialValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

TextArea.defaultProps = {
    label: '',
    title: '',
    placeHolder: '',
    className: '',
    required: true,
    rows: 5,
    cols: 70,
    initialValue: '',
    value: '',
    onChange: () => {}
};

export default TextArea;