import React from 'react';
import './loader.scss';
import { FaCut } from 'react-icons/fa'

export const Loader = () => {
    return (
        <div className="loader">

            <div className="lds-ellipsis">
                <FaCut className="icon" />
                <FaCut className="icon" />
                <FaCut className="icon" />
                <FaCut className="icon" />
            </div>
        </div>
    )
}