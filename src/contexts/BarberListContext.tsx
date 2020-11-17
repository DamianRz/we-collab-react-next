import React, {
    createContext,
    useState,
    ReactElement,
    useEffect,
} from 'react';
import { IBarber } from '../types/Barber.type';
import { BARBERLIST_DATA_STORAGE } from '../types/StorageData.type';

export const BarberListContext = createContext({
    getBarbersList: () => undefined,
    setBarbersList: (barbersData: IBarber[]) => undefined,
});

export const BarberListProvider = (props: {
    value?: IBarber[],
    children: ReactElement;
}) => {
    const storex = require('store'); // store :3
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        storex.set(BARBERLIST_DATA_STORAGE, barbers);
    }, [barbers])

    const setBarbersList = (barbersData: IBarber[]) => {
        storex.set(BARBERLIST_DATA_STORAGE, barbersData);
        setBarbers(barbersData);
    }

    const getBarbersList = () => {
        return barbers;
    }

    const context = { getBarbersList, setBarbersList };

    return (
        <BarberListContext.Provider value={context}>
            {props.children}
        </BarberListContext.Provider>
    );
};