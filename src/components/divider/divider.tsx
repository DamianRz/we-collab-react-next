import React, { ReactChild } from 'react';
import './divider.scss';
import '../../styles/theme.scss';

export const Divider = (props: {
    children?: ReactChild,
    img: string,
    align?: string,
    id?: string,
    title?: string,
    className?: string,
}) => {
    return (
        <div id={props.id} className={`divider-box ${props.className}`}>
            <div className={`divider_left`}>
                <div className="back_img"
                    style={{ backgroundImage: `url(${props.img})` }} />
                <div className="divider_items">
                    {props.title ? <p className="big-title divider-title">{props.title}</p> : null}
                    {props.children}
                </div>
            </div>
        </div>
    )
}
