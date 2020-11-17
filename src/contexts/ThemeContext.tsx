import React, {
    ReactElement,
    createContext,
    useState,
} from 'react';

export const ThemeContext = createContext({
    getTheme: () => undefined,
});

export const ThemeProvider = (props: {
    value: string,
    children: ReactElement;
}) => {

    const [theme, setTheme] = useState(props.value || 'light');

    const getTheme = () => {
        return theme;
    }

    const context = { getTheme };

    return (
        <ThemeContext.Provider value={context}>
            {props.children}
        </ThemeContext.Provider>
    );
};