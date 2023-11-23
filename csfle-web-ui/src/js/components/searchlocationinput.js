import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import '../../scss/components/typeinput.scss'

function SearchLocationInput(props) {
    const autoCompleteRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(props.initialValue);
    let autoComplete;

    const onBlur = () => {
        setFocused(false);
    }

    const onFocus = () => {
        setFocused(true);
    }

    useEffect(() => {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { types: ["address"], componentRestrictions: { country: props.countryCode } }
        );
        autoComplete.setFields(["formatted_address"]);
        autoComplete.addListener("place_changed", () => handlePlaceChanged(setValue));
    }, []);

    const handlePlaceChanged = (updateValue) => {
        const place = autoComplete.getPlace();
        const value = place.formatted_address;
        console.log(place);
        updateValue(value);
        props.onSelect && props.onSelect(props.id, props.name, place.formatted_address);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        props.onChange && props.onChange(event);
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
                type='text'
                id={props.id}
                name={props.name}
                ref={autoCompleteRef}
                placeholder={props.placeHolder}
                disabled={props.disabled}
                required={props.required}
                value={value}
                pattern={props.pattern}
                size={props.size}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
            />
        </p>
    );
}

SearchLocationInput.propTypes = {
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
    size: PropTypes.string,
    onChange: PropTypes.func,
    countryCode: PropTypes.string
};

SearchLocationInput.defaultProps = {
    label: '',
    title: '',
    placeHolder: '',
    className: '',
    required: true,
    initialValue: '',
    value: '',
    size: '100',
    onChange: () => {}
};

export default SearchLocationInput;