import React from 'react';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { StepperFooter } from '../reserve-modal/stepper-footer';
import './confirm-dialog.scss';
import '../../styles/effects.scss';
import '../../styles/theme.scss';

export const ConfirmDialog = (props: {
    onAccept: () => void,
    onCancel: () => void,
    title: string,
    message: string,
    acceptLabel?: string,
    cancelLabel?: string,
}) => {
    return (
        <DialogModal
            className="confirm-dialog"
            title={props.title}
            onClose={() => { props.onCancel() }}
        >
            <div className="confirm-box effect-slide-top">
                <p className="text text-dark confirm-message">{props.message}</p>
            </div>
            <StepperFooter
                nextButtonLabel={props.acceptLabel}
                prevButtonLabel={props.cancelLabel}
                onNextButtonClick={() => props.onAccept()}
                onPrevButtonClick={() => props.onCancel()}
            />
        </DialogModal>
    )
}
