import React, {useState} from 'react';
import ReactSwitch from 'react-switch';
import '../../scss/components/switch.scss'

function Switch(props) {
    const [checked, setChecked] = useState(!!props.initialState);

    const handleChange = (checked, changeEvent, id) => {
        props.onChange && props.onChange(id, props.name, checked);
        setChecked(checked);
    }

    const handleClick = (checked) => {
        props.onClick && props.onClick(checked);
        setChecked(checked);
    }

    return (
        <label>
            <ReactSwitch
                id={props.id}
                onChange={handleChange}
                checked={checked}
                className="react-switch"
                onColor="#e05915"
                height={24}
                width={48}
            />
        </label>
    )
}

export default Switch;