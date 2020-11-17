import React, { Children, ReactChild, useContext } from 'react';
import './stepper.scss';

export const Stepper = (props: {
    wizard: number,
    children: ReactChild[],
    className: string
}) => {
    return (
        <div className={`stepper ${props.className || ''}`}>
            <div className="step">
                {props.children[props.wizard]}
            </div>
        </div>
    )
}
