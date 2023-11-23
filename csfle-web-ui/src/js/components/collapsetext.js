import React, {useState} from 'react';
import Collapse, { Panel } from 'rc-collapse';
import '../../scss/components/collapsetext.scss';

const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88' +
    '.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.' +
    '6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5.' +
    '2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

function expandIcon({ isActive }) {
    return (
        <i style={{ marginRight: '.5rem' }}>
            <svg
                viewBox="0 0 1024 1024"
                width="1rem"
                height="1rem"
                fill="currentColor"
                style={{
                    verticalAlign: '-.125rem',
                    transition: 'transform .2s',
                    transform: `rotate(${isActive ? 90 : 0}deg)`,
                }}
            >
                <path d={arrowPath}></path>
            </svg>
        </i>
    );
}

function CollapseText(props) {
    const [activeKey, setActiveKey] = useState(['4']);

    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    }

    const getItems = () => {
        const items = [];
        items.push(
            <Panel header={props.header} key="1">
                <Collapse defaultActiveKey="1">
                    {props.content}
                </Collapse>
            </Panel>
        );

        return items;
    }

    return (
        <Collapse
            accordion={false}
            onChange={onChange}
            activeKey={activeKey}
            expandIcon={expandIcon}
        >
            {getItems()}
        </Collapse>
    )
}

export default CollapseText;