/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import { IReserve, defaultReserve } from '../types/Reserve.type';
import React, {
    ReactElement,
    createContext,
    useEffect,
    useState,
} from 'react';

export const ReserveContext = createContext({
    getReserveData: () => undefined,
    setReserveData: (reserve: IReserve) => undefined,
});

export const ReserveProvider = (props: {
    value: IReserve,
    children: ReactElement;
}) => {

    const [reserve, setReserve] = useState(props.value || defaultReserve);

    const setReserveData = (reserveData: IReserve) => {
        setReserve(reserveData);
    }

    const getReserveData = () => {
        return reserve;
    }

    const context = { getReserveData, setReserveData };

    return (
        <ReserveContext.Provider value={context}>
            {props.children}
        </ReserveContext.Provider>
    );
};