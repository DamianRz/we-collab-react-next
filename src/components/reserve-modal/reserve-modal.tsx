import React, { useContext, useState, useEffect } from 'react';

import { BarbersList } from './barbers-list/barber-list';
import { Button } from '../button';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { IReserve } from '../../types/Reserve.type';
import { LoginModal } from '../login-modal/login-modal';
import { StepperFooter } from './stepper-footer';
import { ReserveTime } from './reserve-time/reserve-time';
import { ServicesList } from './services-list/services-list';
import { Stepper } from '../stepper/stepper';
import { UserContext } from '../../contexts/UserContext';
import { defaultBarber } from '../../types/Barber.type';
import { defaultService } from '../../types/Service.type';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ConfirmBox } from './confirm-box/confirm-box';
import ReserveActions from '../../actions/Reserve.actions';
import moment, { now } from 'moment';
import db from '../../config/firebase';

import 'date-fns';
import './reserve-modal.scss';
import '../../styles/theme.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';


export const SuccessBox = (props: {
  title: string,
  message: string
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  return (
    <div className="reserve-step">
      <div className="step-title">
        <p className={`step-subtitle text text-${getTheme()}`}>
          {props.title}
        </p>
      </div>
      <div className="confirm_data-box">
        <p className={`confirm_info text text-${getTheme()}`}>
          {props.message}
        </p>
        <FaRegCalendarCheck className="success-icon effect-slide_top" />
      </div>
    </div>
  );
}


export const ReserveModal = (props: { className?: string }) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  const {
    // @ts-ignore
    userIsLogged,
    getUserData,
  } = useContext(UserContext);
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  // BURN DATA
  const services = [
    {
      workId: 1,
      name: 'Degradé',
      img: '',
      cost: 290,
    },
    {
      workId: 2,
      name: 'Degrade & barba',
      img: '',
      cost: 390,
    },
    {
      workId: 3,
      name: 'Degrade & cejas',
      img: '',
      cost: 350,
    },
    {
      workId: 4,
      name: 'Clasico',
      img: '',
      cost: 280,
    },
    {
      workId: 5,
      name: 'Cejas',
      img: '',
      cost: 80,
    },
    {
      workId: 6,
      name: 'Barba',
      img: '',
      cost: 130,
    },
    {
      workId: 7,
      name: 'Corte & Black Mask',
      img: '',
      cost: 530,
    },
    {
      workId: 8,
      name: 'Black Mask',
      img: '',
      cost: 300,
    },
    {
      workId: 9,
      name: 'Platinado',
      img: '',
      cost: 1450,
    },
    {
      workId: 10,
      name: 'Mechas rubias',
      img: '',
      cost: 1000,
    },
    {
      workId: 11,
      name: 'Mechas grises, blancas',
      img: '',
      cost: 1100,
    },
    {
      workId: 12,
      name: 'Colores fantasia',
      img: '',
      cost: 900,
    },
    {
      workId: 13,
      name: 'Franjas fantasia',
      img: '',
      cost: 700,
    },
  ];
  const [showDialog, setShowDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [reserveHour, setReserveHour] = useState('');
  const [reserveDate, setReserveDate] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(defaultBarber);
  const [selectedService, setSelectedService] = useState(defaultService);

  const [wizard, setWizard] = useState(0);
  const totalWizard: number = 3;

  const reserveActions = new ReserveActions();

  const createReserve = async () => {
    const startDateFormatted = `${moment(reserveDate).format().split('T')[0]
      }T${reserveHour}:00`;
    const newReserve: IReserve = {
      barberOrHairdresserId: selectedBarber.barberId,
      clientId: getUserData().clientId,
      socialNumber: getUserData().socialNumber,
      nameClient: getUserData().username,
      mailClient: getUserData().email,
      celClient: getUserData().cel || '0000',
      startTime: startDateFormatted,
      priceWork: selectedService.cost,
      workToDo: selectedService.name,
    };

    setDisabledButton(true);
    const response: any = await reserveActions.add(newReserve);

    if (response) {
      //* Post & Put Firebase.
      await createReserveTimeOnFirebase(
        selectedBarber.name,
        startDateFormatted
      );

      setWizard(4);
      setTimeout(() => {
        // restart all steps of reserve_modal
        setSelectedService(defaultService);
        setSelectedBarber(defaultBarber);
        setReserveDate(new Date());
        setReserveHour('');
        setShowDialog(false);
        setWizard(0);
      }, 3000);
    }
    setDisabledButton(false);
  };

  //* Post & Put Firebase.
  const createReserveTimeOnFirebase = async (barberName, reserveTime) => {
    try {
      let updateReserve;
      let selectedReserveDate;

      //? Create new Times Array and add the reserve time.
      let newTimes = [];
      let reserveTime_Create = moment(reserveTime)
        .format()
        .toString()
        .split('T')[1]
        .substr(0, 5);
      newTimes.push(reserveTime_Create);

      // Flag to validate when is an update or when is a create.
      let isUpdated = false;

      // Validate if already exist reserves in the current date.
      const resultDocs = await getReservesFirebase(barberName);

      if (!resultDocs) {
        console.error('No existen resultados. . .');
      }

      // Solo para checkear si la fecha es igual a la de actual
      selectedReserveDate = moment(reserveDate.toUTCString())
        .format()
        .toString()
        .split('T')[0];

      // nuevo arreglo de sdocuments formateado en fecha.
      const fullParsedResultData = resultDocs.map((data) => {
        return {
          id: data.id,
          date: moment(data.date.toDate().toUTCString())
            .format()
            .toString()
            .split('T')[0],
          times: data.times,
        };
      });

      //! Function to update document reserves if [] is not empty.
      for (const res of fullParsedResultData) {
        if (res.id) {
          if (selectedReserveDate === res.date) {
            //? Estamos colocando en el arreglo de horas a guardar para este dia,
            //? las horas que existan anteriormente para este dia
            newTimes.push(...res.times);

            //! Update Obj to PUT on Firebase:
            updateReserve = {
              date: reserveDate,
              times: newTimes,
            };
            //? PUT - Actualizar document de reserva dado a que hay reservas para este dia
            //console.log('IF -> PUT - Update!');
            await db
              .collection('reservas')
              .doc(nameParcerFunction(barberName))
              .collection('day_reserves')
              .doc(res.id)
              .set(updateReserve);

            //? Flag to control when is Update and When is Post
            isUpdated = true;
          }
        }
      }

      //! Validamos si ya se actualizo o hay que crear un documento nuevo.
      if (!isUpdated) {
        // Creating Obj to POST on Firebase:
        updateReserve = {
          date: reserveDate,
          times: newTimes,
        };

        //? POST - Actualizar document de reserva dado a que hay reservas para este dia
        //console.log('IF -> POST - Creating . . .');
        await db
          .collection('reservas')
          .doc(nameParcerFunction(barberName))
          .collection('day_reserves')
          .doc(selectedReserveDate)
          .set(updateReserve);
      }
      //}
    } catch (error) {
      console.error(
        `Error: Creando o Actualizando Firebase Reserve. -> ${error}`
      );
    }
  };

  //* Parce Method - Name convention for firestore docs.
  const nameParcerFunction = (name: string) => {
    let parsedName = name.toLowerCase().replace(' ', '.');
    return parsedName;
  };

  //* Query Method - GET Firestore Reserves
  const getReservesFirebase = async (barberName) => {
    const resRef = await db
      .collection('reservas')
      .doc(nameParcerFunction(barberName))
      .collection('day_reserves');

    const result = await resRef
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .catch((err) => console.error(err));

    return result;
  };

  const checkStepByWizard = () => {
    switch (wizard) {
      case 0:
        return selectedBarber.name ? true : false;
      case 1:
        return selectedService.name ? true : false;
      case 2:
        return reserveDate && reserveHour ? true : false;
      case 3:
        return true;
    }
    return false;
  };

  const goToReserve = () => {
    console.log('GoToReserve -> ');
    setShowLoginDialog(false);
    setShowDialog(true);
  };

  return (
    <div className="reserve-modal">
      <div className="dialog_activator-box">
        <Button
          className={`activator-btn reserve-btn theme-button`}
          label="Reservar"
          icon={false}
          onClick={() => {
            userIsLogged() ? setShowDialog(true) : setShowLoginDialog(true);
          }}
        />
      </div>

      {!showDialog ? null : (
        <DialogModal
          title="Reservación - Art Experience"
          className="dialog_modalx"
          onClose={() => {
            setShowDialog(false);
          }}
          hideCloseButton={wizard == 4}
        >
          <Stepper className="reserve-stepper" wizard={wizard}>
            {/* BARBERS STEP  */}
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Seleccione el Barbero
                </p>
              </div>
              <BarbersList
                value={selectedBarber}
                setBarber={setSelectedBarber}
              />
            </div>

            {/* SERVICES STEP  */}
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Seleccione el Servicio que usted desee
                </p>
              </div>
              <ServicesList
                services={services}
                value={selectedService}
                setService={setSelectedService}
              />
            </div>

            {/* RESERVE_TIME STEP  */}
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Seleccione la Fecha y Hora
                </p>
              </div>
              <ReserveTime
                reserveDate={reserveDate}
                reserveHour={reserveHour}
                barberId={selectedBarber.barberId || -1}
                selectedBarber={selectedBarber || {}}
                onSelctDate={setReserveDate}
                onSelctHour={setReserveHour}
              />
            </div>

            {/* CONFIRMATION STEP  */}
            <div className="reserve-step">
              <div className="step-title">
                <p className={`step-subtitle text text-${getTheme()}`}>
                  Confirmación de Reserva
                </p>
              </div>
              <ConfirmBox
                barber={selectedBarber}
                service={selectedService}
                hour={reserveHour}
                date={moment(reserveDate).format('DD/MM/YYYY')}
              />
            </div>

            {/* SUCCESS STEP */}
            <SuccessBox
              title="Reservación - Art Experience"
              message="Su Reserva se completo ¡Exitosamente!"
            />

          </Stepper>
          {wizard != 4 ? (
            <StepperFooter
              wizard={wizard}
              checkStepByWizard={checkStepByWizard}
              nextButtonLabel={wizard < totalWizard ? 'siguiente' : 'Reservar'}
              prevButtonLabel="VOLVER"
              onNextButtonClick={
                wizard < totalWizard
                  ? () => {
                    setWizard(wizard + 1);
                  }
                  : () => {
                    createReserve();
                  }
              }
              onPrevButtonClick={() => {
                setWizard(wizard - 1);
              }}
              onUpdateButtonClick={() => setWizard(wizard - 1)}
            />
          ) : null}
        </DialogModal>
      )}
      {showLoginDialog ? (
        <LoginModal
          show={true}
          onClose={setShowLoginDialog}
          onSuccessLogin={goToReserve}
        />
      ) : null}
    </div>
  );
};
