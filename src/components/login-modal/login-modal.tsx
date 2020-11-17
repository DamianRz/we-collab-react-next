import React, {
  useState,
  useRef,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { Button } from '../button';
import { ClientAccess } from '../client-access/client-access';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { UserContext } from '../../contexts/UserContext';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { getPageName } from '../../utils/utils';
import { INDEX_PAGE, DASHBOARD_PAGE } from '../../types/Pages.type';
import { ThemeContext } from '../../contexts/ThemeContext';
import './login-modal.scss';
import '../../styles/effects.scss';
import '../../styles/theme.scss';
import '../../styles/theme-buttons.scss';
import { FaRegCalendarCheck } from 'react-icons/fa';

export const LoginModal = (props: {
  show?: boolean;
  onClose?: Dispatch<SetStateAction<boolean>>;
  onSuccessLogin?: any;
}) => {
  const [showDialog, setShowDialog] = useState(props.show || false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowAccountMenu);

  /* CONTEXTS */
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    userIsLogged,
    getUserData,
    setUserData,
  } = useContext(UserContext);
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);

  const launchModal = () => {
    if (userIsLogged()) {
      setShowAccountMenu(true);
    } else {
      setShowDialog(true);
    }
  };

  const onClose = () => {
    setShowDialog(false);
    props.onClose(false);
  };

  const onClientLogged = (clientData: any) => {
    setTimeout(() => {
      setShowDialog(false);
    }, 2000);
  };

  const logOut = () => {
    setDisabledButton(true);
    setUserData(null);
    setDisabledButton(false);
    document.location.href = '/';
  };

  return (
    <div className="login-modal">
      {/* ACTIVATOR DIALOG */}
      {!props.show ? (
        <div className="dialog_activator-box">
          <Button
            onClick={() => {
              launchModal();
            }}
            className={
              !userIsLogged()
                ? 'theme-button'
                : 'theme-button-outlined ' + `activator-btn login-btn`
            }
            icon={<RiAccountCircleLine />}
            label={
              userIsLogged() ? getUserData().username : 'Reservar'
            }
          />
        </div>
      ) : null}

      {/* LOGIN MODAL */}
      {!showDialog ? null : (
        <DialogModal
          title="Inicio de Sesion"
          className="login-dialog"
          width="65vw"
          height="65vh"
          onClose={() => {
            setShowDialog(false);
            if (props.onClose) {
              props.onClose(false);
            }
          }}
        >

          <ClientAccess
            onClientLogged={onClientLogged}
            onClose={props.onClose}
          />

        </DialogModal>
      )}

      {/* ACCOUNT MENU */}
      {showAccountMenu && userIsLogged() ? (
        <div
          className={`account-menu effect-opacity ${getTheme()}`}
          ref={wrapperRef}
        >
          <p className={`item-text user-name text text-${getTheme()}`}>
            {getUserData().username}
          </p>
          <p className={`item-text user-email text text-${getTheme()}`}>
            {getUserData().email}
          </p>
          {getPageName() === INDEX_PAGE && getUserData().admin ? (
            <Button
              label="Gestion de Reservas"
              className="item-list_btn theme-button-outlined"
              onClick={() => {
                document.location.href = '/Dashboard';
              }}
            />
          ) : null}
          {getPageName() === DASHBOARD_PAGE ? (
            <Button
              label="Pagina Principal"
              className="item-list_btn theme-button-outlined"
              onClick={() => {
                document.location.href = '/';
              }}
            />
          ) : null}
          <Button
            label="Cerrar Session"
            className="item-list_btn theme-button-outlined"
            onClick={() => {
              logOut();
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
