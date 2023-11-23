import React, {useState} from 'react';
import Collapse, { Panel } from 'rc-collapse';
import Icon from "../common/icon";
import '../../scss/components/collapsefolder.scss';
import {useMediaQuery} from "../common/hook";

function expandIcon({isActive}) {
    return (
        <i style={{ marginRight: '.5rem' }}>
            {isActive ? (
                <Icon name="folderopen" width="2rem" height="2rem" fill="rgb(248, 215, 117)" />
            ) : (
                <Icon name="folderclose" width="2rem" height="2rem" fill="rgb(248, 215, 117)" />
            )}
        </i>
    );
}

function CollapseFolder(props) {
    const [activeKey, setActiveKey] = useState([]);

    const onChange = (key) => {
        console.log(key)
        setActiveKey(key);
        props.onChange && props.onChange(key);
    }

    return (
        <Collapse
            accordion={false}
            onChange={onChange}
            activeKey={activeKey}
            expandIcon={expandIcon}
        >
            <Panel header={props.header} key={props.header}>
                    <Collapse defaultActiveKey={props.header}>
                        {props.content}
                    </Collapse>
            </Panel>
        </Collapse>
    )
}

export default CollapseFolder;