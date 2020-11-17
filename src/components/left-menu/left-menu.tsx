import React, { useState } from 'react';
import { Button } from '../button';
import { FiMenu } from 'react-icons/fi';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { toolbarButtons } from '../../utils/toolbarButtons';
import './left-menu.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';

export const LeftMenu = () => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="left_menu">
      <Button
        className="theme-button-text activator_btn"
        icon={<FiMenu className="theme-icon icon_button" />}
        onClick={() => {
          setShowDialog(true);
        }}
      />
      {!showDialog ? null : (
        <DialogModal
          onClose={() => {
            setShowDialog(false);
          }}
          className="left_menu-dialog"
        >
          <div className="left-menu-box effect-slide-left">
            <div className="logo">
              <img
                className="logo-img"
                src="https://i.ibb.co/8g4h8sk/A-art-experiecnce.png"
                alt=""
              />
            </div>
            {toolbarButtons.map((button, i) => {
              return (
                <Button
                  key={i}
                  href={button.href}
                  onClick={() => {
                    setShowDialog(false);
                  }}
                  className="theme-button-text left_menu-btn"
                  label={button.label}
                />
              );
            })}
            {/* dialog footer  */}
          </div>
          <div />
        </DialogModal>
      )}
    </div>
  );
};
