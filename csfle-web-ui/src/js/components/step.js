import React from 'react';
import Steps, { Step } from 'rc-steps';
import '../../scss/components/step.scss';
import '../../scss/common/icon.scss';

const description = '';

function CustomStep(props) {
    return (
        <Steps current={props.current} labelPlacement='vertical'>
            {props.steps.map((item, index) => (
                <Step key={index} title={item.title} description={item.description} icon={item.icon} />
            ))}
        </Steps>
    )
}

export default CustomStep;