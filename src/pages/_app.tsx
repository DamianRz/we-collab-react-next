import React, { FC, useContext } from 'react';
import { ButtonProvider, ButtonContext } from '../contexts/ButtonsContext';
import { BARBERLIST_DATA_STORAGE } from '../types/StorageData.type';
import { BarberListProvider } from '../contexts/BarberListContext';
import { USER_DATA_STORAGE } from '../types/StorageData.type';
import { UserProvider } from '../contexts/UserContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { THEME_DARK, THEME_LIGHT } from '../types/Themes.type';
import { LoaderPage } from '../components/loader-page/loader-page';
import '../styles/theme.scss';
import './app.scss';

const App: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const {
    // @ts-ignore
    disabled,
  } = useContext(ButtonContext);
  const store = require('store'); // store :3
  return (
    <div>
      <ButtonProvider disabled={true}>
        <UserProvider value={store.get(USER_DATA_STORAGE) || null}>
          <BarberListProvider value={store.get(BARBERLIST_DATA_STORAGE) || null}>
            <ThemeProvider value={THEME_DARK}>
              <Component {...pageProps} />
            </ThemeProvider>
          </BarberListProvider>
        </UserProvider>
      </ButtonProvider>
    </div>
  );
};
export default App;
