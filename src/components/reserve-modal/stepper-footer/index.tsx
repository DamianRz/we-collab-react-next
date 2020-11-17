import React, { useContext } from 'react';
import { Button } from '../../button';
import './stepper-footer.scss';
import '../../../styles/theme-buttons.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const StepperFooter = (props: {
  wizard?: number;
  checkStepByWizard?: any;
  totalSteps?: number;
  nextButtonLabel?: string;
  prevButtonLabel?: string;
  updateButtonLabel?: string;
  nextButtonStyle?: string;
  prevButtonStyle?: string;
  updateButtonStyle?: string;
  typeNextButton?: 'button' | 'submit' | 'reset';
  className?: string,
  hidePrevButton?: boolean,
  onNextButtonClick: () => void;
  onPrevButtonClick: () => void;
  onUpdateButtonClick?: () => void;
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const PrevButton = () => {
    return (
      <Button
        className={`${props.prevButtonStyle
          ? props.prevButtonStyle
          : 'theme-button-outlined'
          } footer-button`}
        label={props.prevButtonLabel || 'back'}
        onClick={() => props.onPrevButtonClick()}
      />
    );
  };

  const NextButton = () => {
    return (
      <Button
        type={props.typeNextButton}
        className={`${props.nextButtonStyle ? props.nextButtonStyle : 'theme-button'
          } footer-button confirm`}
        label={props.nextButtonLabel || 'finalize'}
        onClick={() => props.onNextButtonClick()}
      />
    );
  };

  const UpdateButton = () => {
    return (
      <Button
        type={props.typeNextButton}
        className={`${props.updateButtonStyle ? props.updateButtonStyle : 'theme-button'
          } footer-button confirm`}
        label={props.updateButtonLabel || 'Update'}
        onClick={() => props.onUpdateButtonClick()}
      />
    );
  };

  return (
    <div className={`footer ${props.className} ${getTheme()}`}>
      <div className="footer_right-box">
        {!props.hidePrevButton && (
          props.checkStepByWizard
            ? props.wizard
              ? PrevButton()
              : null
            : PrevButton()
        )}
        {props.checkStepByWizard
          ? props.checkStepByWizard()
            ? NextButton()
            : null
          : NextButton()}
      </div>
    </div>
  );
};
