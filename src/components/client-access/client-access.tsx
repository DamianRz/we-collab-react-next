import React, { useState, useContext, Fragment, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { UserContext } from '../../contexts/UserContext';
import { ValidationForm } from '../validation-form/validation-form';
import { IClient } from '../../types/Client.type';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Textfield } from '../text-field/text-field';
import { StepperFooter } from '../reserve-modal/stepper-footer';
import { FormContext, FormProvider } from '../../contexts/FormContext';
import ClientActions from '../../actions/Client.actions';
import './client-access.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { SuccessBox } from '../reserve-modal/reserve-modal';

export const ClientAccess = (props: { onClose: any; onClientLogged: any }) => {
  const defaultLoginFields = {
    email: '',
    password: '',
  };
  const defaultRegisterFields = {
    name: '',
    email: '',
    cel: '',
    socialNumber: '',
    password: '',
    repeatPassword: '',
  };
  const baseMessage = {
    value: '',
    isError: false,
  };

  const [accessMode, setAccessMode] = useState(1); // 1 - Login / 0 - register
  const [successDialog, showSuccessDialog] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [message, setMessage] = useState(baseMessage);

  useEffect(() => {
    setMessage({ value: '', isError: false });
  }, [accessMode]);

  const clientActions: ClientActions = new ClientActions();

  /* CONTEXTS */
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    setUserData,
  } = useContext(UserContext);

  /* LOGIN */
  const login = async (loginFields?: any) => {
    setMessage({ value: '', isError: false }); //clear

    const fields = {
      email: loginFields.email.value,
      password: loginFields.password.value,
    };
    setDisabledButton(true);
    const response = await clientActions.login(fields);
    if (response) {
      props.onClientLogged(response);
      setUserData({ ...response.data.user, ...response.data.client });
      setMessage({ value: 'Has iniciado sesion con exito', isError: false });
      setUserIsLogged(true);
    } else {
      setMessage({
        value: 'No se pudo iniciar sesion, verifique email y contaseña',
        isError: true,
      });
    }
    setDisabledButton(false);
  };

  /* REGISTER */
  const signUp = async (regFelds: any) => {
    setMessage({ value: '', isError: false }); //clear
    const fields: IClient = {
      username: regFelds.name.value,
      cel: regFelds.cel.value,
      email: regFelds.email.value,
      name: regFelds.name.value,
      password: regFelds.password.value,
      repeatPassword: regFelds.repeatPassword.value,
      // ADD socialNumber
      socialNumber: regFelds.socialNumber
        ? regFelds.socialNumber.value
        : undefined,
    };
    setDisabledButton(true);
    const response = await clientActions.add(fields);

    console.log('Este es el result singup -> ', response);
    if (response) {
      if (response.status) {
        // props.onClientRegister(response);
        setMessage({ value: 'Registro realizado con exito', isError: false });
        setUserData(response);
        //props.onClose(true);
        props.onClientLogged(response);
        setUserIsLogged(true);
      } else {
        setMessage({ value: response.statusText, isError: true });
      }
    } else {
      setMessage({
        value: 'Error, Es posible que el nombre de usario o el email ya esten registrados!',
        isError: true,
      });
    }
    setDisabledButton(false);
  };

  const SocialBox = () => {
    const [socialChecked, setSocialChecked] = useState(false);
    return (
      <>
        <div className="social-box">
          <li>
            <ul>
              <FormControlLabel
                label="Soy Socio de Art Experience"
                className="social-form-control-label"
                control={
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSocialChecked(e.target.checked);
                    }}
                  />
                }
              />
            </ul>
          </li>
        </div>
        <SocialForm show={socialChecked} />
      </>
    );
  };

  const SocialForm = (props: { show: boolean }) => {
    return (
      <>
        {props.show && (
          <Textfield
            id="socialNumber"
            name="socialNumber"
            type="number"
            label="Numero Social"
          />
        )}
      </>
    );
  };

  const LoginForm = () => {
    return (
      <FormProvider>
        <>
          <li style={{ listStyle: 'none' }}>
            <ul>
              <Textfield
                id="email"
                name="email"
                label="Email o Numero Social"
                type="text"
                lowerCase={true}
              />
            </ul>
            <ul>
              <Textfield
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                lowerCase={true}
              />
            </ul>
          </li>
          <SubmitButton
            onNext={login}
            onPrev={() => {
              setAccessMode(0);
            }}
            nextButtonLabel={'Acceder'}
            prevButtonLabel={'Registrese aqui!'}
          />
        </>
      </FormProvider>
    );
  };




  const SubmitButton = (props: {
    nextButtonLabel: string;
    prevButtonLabel: string;
    onNext: any;
    onPrev: any;
  }) => {
    const {
      // @ts-ignore
      validateFields,
      getFields,
    } = useContext(FormContext);
    return (
      <StepperFooter
        nextButtonLabel={props.nextButtonLabel}
        prevButtonLabel={props.prevButtonLabel}
        typeNextButton="button"
        onNextButtonClick={() => {
          if (validateFields()) {
            props.onNext(getFields());
          }
        }}
        onPrevButtonClick={() => {
          props.onPrev();
        }}
      />
    );
  };





  const RegisterForm = () => {
    return (
      <FormProvider>
        <>
          <li style={{ listStyle: 'none' }}>
            <ul>
              <SocialBox />
            </ul>
            <ul>
              <Textfield
                id="name"
                name="name"
                label="Username"
                type="text"
              />
            </ul>
            <ul>
              <Textfield
                id="email"
                name="email"
                label="Email"
                type="email"
                lowerCase={true}
              />
            </ul>
            <ul>
              <Textfield
                id="cel"
                name="cel"
                label="Celular / Telefono"
                type="number"
              />
            </ul>
            <ul>
              <Textfield
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                lowerCase={true}
              />
            </ul>
            <ul>
              <Textfield
                id="repeatPassword"
                name="repeatPassword"
                label="Repita Contraseña"
                type="password"
                equalField="password"
                lowerCase={true}
              />
            </ul>
          </li>
          <SubmitButton
            onNext={signUp}
            onPrev={() => {
              setAccessMode(1);
            }}
            nextButtonLabel={'Registrarse'}
            prevButtonLabel={'Iniciar Sesion'}
          />
        </>
      </FormProvider>
    );
  };





  return (
    <div className="login-box">
      {message.isError && (
        <p className="error_message">{message.value}</p>
      )}
      {userIsLogged && (
        <SuccessBox
          title="Acceso a Art Experience"
          message={accessMode ? 'Ha iniciado con exito!' : 'Se ha registrado con exito!'}
        />
      )}
      {!userIsLogged && (accessMode ? <LoginForm /> : <RegisterForm />)}
    </div>
  );
};
