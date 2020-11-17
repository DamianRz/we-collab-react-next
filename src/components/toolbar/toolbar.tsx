import { Button } from '../button';
import { LeftMenu } from '../left-menu/left-menu';
import { LoginModal } from '../login-modal/login-modal';
import React, { useContext } from 'react';
import { ReserveModal } from '../reserve-modal/reserve-modal';
import { toolbarButtons } from '../../utils/toolbarButtons';
import { UserContext } from '../../contexts/UserContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import './toolbar.scss';
import '../../styles/theme-buttons.scss';

export const Toolbar = () => {
  const {
    // @ts-ignore
    userIsLogged,
    getUserData,
  } = useContext(UserContext);
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  return (
    // ${getTheme()}
    <div className={`toolbar effect-slide_bottom shadow-dark`}>
      <div id="start_page" />
      <div className="left-box">
        <LeftMenu />
        <a href="#banner">
          <img
            className="logo-img effect-opacity"
            src="https://i.ibb.co/hfX81DT/art-experience-500.png"
            alt=""
          />
        </a>
        {toolbarButtons.map((button, i) => {
          return (
            <Button
              key={i}
              href={button.href}
              className="theme-button-text toolbar-btn"
              label={`${button.label}`}
            />
          );
        })}
      </div>
      <div className="right-box">
        {userIsLogged() && !getUserData().admin ? <ReserveModal /> : null}
        <LoginModal />
      </div>
    </div>
  );
};
