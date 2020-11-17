// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ArtExperienceFonts.scss';

import React, { useState, Fragment } from 'react';
// import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { Button } from '../button';
import './notification-menu.scss';

export const USER_ACTIONS = {
  ACCEPTED: 'accepted',
  CANCELLED: 'cancelled',
  NONE: 'none'
}

export const NotificationMenu = () => {

  const data_test = [
    { id: 1, name: 'Fest X', date: '12/12/20 12:00', userAction: USER_ACTIONS.ACCEPTED },
    { id: 2, name: 'Evento de fin de anio', date: '10/05/21 15:00', userAction: USER_ACTIONS.CANCELLED },
    { id: 3, name: 'Evento Party 23', date: '12/12/20 12:00', userAction: USER_ACTIONS.NONE },
    { id: 4, name: 'Festival de cine London', date: '15/01/21 12:00', userAction: USER_ACTIONS.NONE }
  ];

  // let cancelEventMode: boolean = false;

  const [notifications, setNotifications] = useState(data_test);
  const [showMenu, setShowMenu] = useState(false);
  const [cancelEventMode, setCancelEventMode] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});

  // const wrapperRef = useRef(null);

  // useOutsideAlerter(wrapperRef, setShowMenu);

  const acceptEvent = (event) => {
    const copyNotifications = notifications;
    copyNotifications.map(item => {
      if (item === event) {
        item.userAction = USER_ACTIONS.ACCEPTED;
      }
    });
    setNotifications([...copyNotifications]);
  }

  const discardEvent = (event) => {
    const copyNotifications = notifications;
    copyNotifications.map(item => {
      if (item === event) {
        item.userAction = USER_ACTIONS.CANCELLED;
      }
    });
    setNotifications([...copyNotifications]);
    setCancelEventMode(false);
  }

  const getNotificationsAvailable = () => {
    return notifications.filter(item => {
      return item.userAction === USER_ACTIONS.NONE
    }).length
  }

  return (
    <Fragment>
      <div className="notification-btn" onClick={() => { setShowMenu(!showMenu) }}>
        <FontAwesomeIcon
          color="white"
          icon={faBell}
          className="notification-bell" />
        {(getNotificationsAvailable() != 0) && (
          <div className="notification-circle">
            <p className="notification-number art-text">{getNotificationsAvailable()}</p>
          </div>
        )}
      </div>

      {/* getNotificationsAvailable() != 0 ? 'red' : 'white' */}

      <div className="notifications-menu" style={{ visibility: (showMenu ? "visible" : "hidden") }}>
        <p className="notifications-title art-text">Notificaciones</p>
        {!getNotificationsAvailable() && (
          <div className="no-notifications">
            <p className="art_experience-text-light art-text">No tiene notificaciones</p>
          </div>
        )
        }
        {notifications.map(item => {
          if (item.userAction === USER_ACTIONS.NONE) {
            return (
              <Fragment>
                <div className={`${(cancelEventMode && selectedNotification === item) ? 'selected' : ''} notification`}>
                  <div className="notification-info">
                    <p className="art_experience-text-light art-text event-name">{item.name}</p>
                    <p className="art_experience-text-light art-text event-date">{item.date}</p>
                  </div>
                  <div className="buttons-box">
                    {!cancelEventMode && (
                      <Fragment>
                        <Button
                          label="Aceptar"
                          color='white'
                          className="item-list_btn"
                          onClick={() => { acceptEvent(item) }}
                        />
                        <Button
                          label="Cancelar"
                          color='white'
                          className="item-list_btn"
                          onClick={() => {
                            setCancelEventMode(true);
                            setSelectedNotification(item);
                          }}
                        />
                      </Fragment>
                    )}
                    {
                      (cancelEventMode && selectedNotification === item) && (
                        <Fragment>
                          <p className="art_experience-text-light art-text cancel-text">Seguro que desea cancelar la invitacion?</p>
                          <Button
                            label="Si"
                            color='white'
                            className="item-list_btn"
                            onClick={() => { discardEvent(item) }}
                          />
                          <Button
                            label="No"
                            color='white'
                            className="item-list_btn"
                            onClick={() => {
                              setCancelEventMode(false);
                              setSelectedNotification(item);
                            }}
                          />
                        </Fragment>
                      )
                    }
                  </div>
                </div>
              </Fragment>
            );
          }
        }
        )}
      </div>
    </Fragment>
  );
}