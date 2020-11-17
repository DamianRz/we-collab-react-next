/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
    createContext,
    useState,
    ReactElement,
} from 'react';


export const ButtonContext = createContext({
    disabled: false,
    setDisabledButton: (value: boolean) => undefined,
});


export const ButtonProvider = (props: {
    disabled: boolean,
    children: ReactElement;
}) => {
    const [disabled, setDisabledState] = useState(props.disabled);

    const setDisabledButton = (value: boolean) => {
        setDisabledState(value);
    }

    const context = { disabled, setDisabledButton };

    return (
        <ButtonContext.Provider value={context}>
            {props.children}
        </ButtonContext.Provider>
    );
};