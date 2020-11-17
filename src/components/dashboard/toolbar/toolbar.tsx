import React from 'react';
import { LoginModal } from '../../login-modal/login-modal';
import './toolbar.scss';
import '../../../styles/effects.scss';

export const Toolbar = () => {
  return (
    <div className="toolbar effect-slide_bottom">
      <div id="start_page" />
      <div className="left-box">
        <img
          className="logo-img effect-opacity"
          src="https://i.ibb.co/hfX81DT/art-experience-500.png"
          alt=""
        />
      </div>
      <div className="right-box">
        <LoginModal />
      </div>
    </div>
  );
};
