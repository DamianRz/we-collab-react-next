import React, { useContext, useState } from 'react';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import ReserveActions from '../../../actions/Reserve.actions';
import { IReserve } from '../../../types/Reserve.type';
import { Textfield } from '../../text-field/text-field';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import moment from 'moment';
import { StepperFooter } from '../../reserve-modal/stepper-footer';
import { ConfirmDialog } from '../../confirm-dialog';
import { FormContext, FormProvider } from '../../../contexts/FormContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './reserve-dialog.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const ReserveDialog = (props: {
  reserve: IReserve,
  onClose: any,
  onFinalized?: () => undefined,
  onCancelled?: () => undefined,
  onUpdated?: (updated) => any,
}) => {
  const baseReserve: IReserve = {
    barberOrHairdresserId: -1,
    celClient: '',
    clientId: -1,
    mailClient: '',
    nameClient: '',
    priceWork: 0,
    startTime: '',
    additionalCost: 0,
    socialNumber: 0,
  };
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const reserveActions: ReserveActions = new ReserveActions();
  const [reserve, setReserve] = useState(props.reserve || baseReserve);
  const [showFinalizeDialog, setFinalizeDialog] = useState(false);
  const [showCancelDialog, setCancelDialog] = useState(false);

  /* UPDATE RESERVE */
  const updateReserve = async (fields: any) => {
    setDisabledButton(true);
    //let formatDateOld = moment(reserve.startTime).format('YYYY-MM-DDTHH:mm:ss');
    let formatDateFront = moment(fields.startTimeFront.value).format('YYYY-MM-DDTHH:mm:ss');
    let reserveUpdate: IReserve = {

      /* Check the start time: need pass the startTimeFront formatted? 
        add a callendar?
      */
      startTime: formatDateFront,

      /* Fields of form */
      workToDo: fields.workToDo.value,
      priceWork: fields.totalCost.value, /* <-- Are not the same but is necesary */
      celClient: fields.celClient.value,

      /* Not updated fields (disabled or not specify) */
      reserveId: reserve.reserveId,
      clientId: reserve.clientId,
      socialNumber: reserve.socialNumber,
      nameClient: reserve.nameClient,
      barberOrHairdresserId: reserve.barberOrHairdresserId,
      mailClient: reserve.mailClient,
      additionalCost: reserve.additionalCost,
    };
    console.log('RESERVE', reserveUpdate)
    let response = await reserveActions.update(reserveUpdate);
    console.log('Update reserve');
    if (response) {
      console.log('Success updated');
      props.onUpdated(reserveUpdate);
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('Error updating:', response);
    }
  };

  /* FINALIZE RESERVE */
  const finalizeReserve = async () => {
    setDisabledButton(true);
    let response = await reserveActions.doneReserve(
      reserve.barberOrHairdresserId,
      reserve.reserveId
    );
    console.log('finalized');
    if (response) {
      console.log('success finalize');
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('error', response);
    }
  };

  /* CANCEL RESERVE */
  const cancelReserve = async () => {
    setDisabledButton(true);
    let response = await reserveActions.cancel(
      reserve.clientId,
      reserve.reserveId
    );
    console.log('cancel');
    if (response) {
      console.log('success cancel');
      props.onClose();
      setDisabledButton(false);
    } else {
      console.log('error cancel :', response);
    }
  };

  /* TEMPORAL this most exists in ClientAccess */
  const SubmitButton = (props: {
    nextButtonLabel: string;
    prevButtonLabel?: string;
    onNext: any;
    onPrev?: any;
    hidePrevButton?: boolean;
    className?: string;
  }) => {
    const {
      // @ts-ignore
      validateFields,
      getFields,
    } = useContext(FormContext);
    return (
      <StepperFooter
        className={props.className}
        nextButtonLabel={props.nextButtonLabel}
        prevButtonLabel={props.prevButtonLabel}
        typeNextButton="button"
        hidePrevButton={props.hidePrevButton}
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

  return (
    <DialogModal
      className="reserve-modal-dashboard"
      title="Control de Reserva"
      onClose={props.onClose}
    >
      <div className="reserve-modal">
        <div className="reserve_data-box">
          <p className={`reserve_info effect-slide_left text-${getTheme()}`}>Datos del Cliente</p>

          {/* New validation implements */}
          <FormProvider>
            <>
              <li style={{ listStyle: 'none' }}>
                <ul>
                  <Textfield
                    disabled={true}
                    id="nameClient"
                    name="nameClient"
                    label="Nombre del cliente"
                    type="text"
                    defaultvalue={reserve.nameClient}
                  />
                </ul>
                <ul>
                  <Textfield
                    disabled={true}
                    id="mailClient"
                    name="mailClient"
                    label="Email del cliente"
                    type="email"
                    defaultvalue={reserve.mailClient}
                  />
                </ul>
                <ul>
                  <Textfield
                    // disabled={true}
                    id="celClient"
                    label="Cel del cliente"
                    name="celClient"
                    type="number"
                    defaultvalue={reserve.celClient}
                  />
                </ul>
                <ul>
                  <p className={`reserve_info text-${getTheme()}`}>Datos de la Reserva</p>
                  <Textfield
                    id="startTimeFront"
                    name="startTimeFront"
                    label="Fecha y Hora de Reserva"
                    type="text"
                    defaultvalue={reserve.startTimeFront}
                  />
                </ul>
                <ul>
                  <Textfield
                    id="barberName"
                    name="barberName"
                    label="Nombre Barbero"
                    type="string"
                    defaultvalue={reserve.barberName}
                  />
                </ul>
                <ul>
                  <Textfield
                    id="workToDo"
                    name="workToDo"
                    label="Servicio Seleccionado"
                    type="text"
                    defaultvalue={reserve.workToDo}
                  />
                </ul>
                <ul>
                  <Textfield
                    id="totalCost"
                    name="totalCost"
                    label="Costo Total"
                    type="number"
                    defaultvalue={reserve.totalCost}
                  />
                </ul>
              </li>
              <SubmitButton
                onNext={updateReserve}
                nextButtonLabel={'Guardar Cambios'}
                hidePrevButton={true}
                className="submit-button-update"
              />
              <SubmitButton
                onNext={(data) => setFinalizeDialog(true)}
                onPrev={(data) => setCancelDialog(true)}
                nextButtonLabel={'Finalizar Reserva'}
                prevButtonLabel={'Cancelar Reserva'}
              />
            </>
          </FormProvider>
        </div>
      </div>

      {showFinalizeDialog ? (
        <ConfirmDialog
          title="Finalizacion de reserva"
          message="Esta seguro de que desea finalizar la reserva?"
          acceptLabel="Finalizar"
          cancelLabel="Volver"
          onAccept={() => finalizeReserve()}
          onCancel={() => setFinalizeDialog(false)}
        />
      ) : null}
      {showCancelDialog ? (
        <ConfirmDialog
          title="Cancelacion de reserva"
          message="Esta seguro de que desea cancelar la reserva?"
          acceptLabel="Cancelar"
          cancelLabel="Volver"
          onAccept={() => cancelReserve()}
          onCancel={() => setCancelDialog(false)}
        />
      ) : null}
    </DialogModal>
  );
};
