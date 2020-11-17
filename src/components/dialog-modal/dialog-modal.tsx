// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Button } from '../button';
import { AiOutlineClose } from 'react-icons/ai';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Text } from '../text';
import './dialog-modal.scss';
import './dialog-modal-mobile.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';

export const DialogModal = (props: {
  title?: string;
  header?: any;
  children?: React.ReactChild | React.ReactChild[];
  width?: string;
  height?: string;
  onClose: () => void;
  hideCloseButton?: boolean;
  showModal?: boolean;
  className?: string;
  buttonClassName?: string;
}) => {
  const [visible, setVisible] = useState<boolean>(true);

  const onClose = () => {
    setVisible(false);
    props.onClose();
  };

  return (
    <div className={`${props.className} dialog-box ${visible ? ' effect-opacity ' : ' effect-hide'}`}>
      <div className={`dialog-modal effect-opacity`}>
        <div className={`header`}>
          <div
            onClick={() => {
              onClose();
            }}
            className="close_btn-box"
          >
            {!props.hideCloseButton ? (
              <Button
                className="close_btn theme-button-text"
                icon={<AiOutlineClose className="theme-icon" />}
              />
            ) : null}
          </div>
          <div className="header-title">
            {props.header || (
              <Text type="text">{props.title}</Text>
            )}
          </div>
        </div>
        {[props.children].map((child, i) => {
          return <div key={i}>{child}</div>;
        })}
      </div>
    </div>
  );
};
