import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './text.scss';

export const Text = (props: {
    children: string
    className?: string
    type: 'brand' | 'title' | 'subtitle' | 'text' | 'small',
    autoSize?: boolean
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    return (
        <p className={`dmz-text theme-${props.type} ${getTheme()} ${props.className}`}>
            {props.children}
        </p>
    )
}