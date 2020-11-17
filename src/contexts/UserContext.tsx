import React, {
    createContext,
    useState,
    ReactElement,
    useEffect,
} from 'react';
import { IUser, defaultUser } from '../types/User.type';
import { USER_DATA_STORAGE } from '../types/StorageData.type';

export const UserContext = createContext({
    userIsLogged: () => undefined,
    userIsAdmin: () => undefined,
    getUserData: () => undefined,
    setUserData: (userData: any) => { }
});

const storex = require('store'); // store :3

export const UserProvider = (props: {
    value?: IUser,
    children: ReactElement;
}) => {
    const [user, setUser] = useState(props.value);

    useEffect(() => {
        storex.set(USER_DATA_STORAGE, user);
    }, [user])

    const setUserData = (userData: any) => {
        setUser(userData);
    }

    const getUserData = () => {
        return user ? user : defaultUser;
    }

    const userIsLogged = () => {
        return user ? true : false;
    }

    const userIsAdmin = () => {
        if (user) {
            return user.admin ? true : false;
        } else {
            return false;
        }
    }

    const context = { userIsLogged, userIsAdmin, getUserData, setUserData };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};