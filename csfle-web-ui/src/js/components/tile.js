import React, {useState} from 'react';
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ruler} from "../common/common";
import '../../scss/components/tile.scss';

function Tile(props) {
    const [focused, setFocused] = useState(false);

    const onBlur = () => {
        setFocused(false);
    }

    const onFocus = () => {
        setFocused(true);
    }

    const handleClick = (index, name, parent, size, clickEvent) => {
        clickEvent.preventDefault();
        props.onClick && props.onClick(index, name, parent, size);
    }

    let required;
    if(props.required) {
        required = '*';
    } else {
        required = '';
    }

    let activeClass = 'tile';
    //console.log(props.selectedItem);
    if(props.selectedItem.index === props.index && props.selectedItem.name === props.label) {
        activeClass = activeClass + ' highlight';
    } else {
        activeClass = activeClass + ' playdown';
    }
    let icon;
    if(props.icon) {
        icon =
            <>
                &nbsp;<FontAwesomeIcon icon={props.icon} />
            </>
    }

    let margin = ruler(props.margin);
    let padding = ruler(props.padding);

    return (
            <div id={props.id}
               className={activeClass}
               style={{
                   width: props.width,
                   marginTop: margin.top + 'px',
                   marginRight: margin.right + 'px',
                   marginBottom: margin.bottom + 'px',
                   marginLeft: margin.left + 'px',
                   paddingTop: padding.top + 'px',
                   paddingRight: padding.right + 'px',
                   paddingBottom: padding.bottom + 'px',
                   paddingLeft: padding.left + 'px'}}
               onClick={(e) => handleClick(props.index, props.label, props.parent, props.size, e)}>
                <span>{props.label}{icon}</span>
            </div>
    )
}

Tile.propTypes = {
    id: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
    label: PropTypes.string.isRequired,
    ref: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    index: PropTypes.number,
    size: PropTypes.number,
    parent: PropTypes.string,
    icon: PropTypes.string,
    selectedItem: PropTypes.object
};

Tile.defaultProps = {
    width: 'auto',
    margin: '5 0',
    padding: '10 0',
    label: '',
    className: '',
    required: false,
    value: '',
    checked: false,
    onClick: () => {},
    selectedItem: {}
};

export default Tile;