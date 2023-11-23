import React  from 'react';
import countries from "../common/countries";
import '../../scss/components/title.scss'

function Title(props) {
    let message;
    if(props.icon) {
        message =
            <>
                {props.message.toUpperCase()} <img src={"/images/" + props.icon} />
            </>
    } else {
        message =
            <>
                {props.message.toUpperCase()}
            </>
    }

    return (
        <p key={props.index} className="titleholder">
            <label className="title">{message}</label>
        </p>
    )
}

export default Title;