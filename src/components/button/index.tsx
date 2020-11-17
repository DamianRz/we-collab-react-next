import React, { useContext, Fragment } from 'react';
import { ButtonContext } from '../../contexts/ButtonsContext';
import './button.scss';

export const Button = (props: {
  label?: string;
  onClick?: any;
  formRef?: string;
  width?: string;
  children?: React.ReactChild;
  color?: string;
  disabled?: boolean;
  fontColor?: string;
  icon?: any,
  className?: string;
  labelClassName?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  // CONTEXTS
  const {
    // @ts-ignore
    disabled
  } = useContext(ButtonContext);

  const getLabelClasses = () => {
    let classes = 'label_button text-light text';

    if (props.labelClassName) {
      classes = ` ${props.labelClassName}`
    }
    if (props.icon) {
      classes = `${classes} icon-left`
    }
    return classes;
  }

  return (
    <div className="button">
      <div className={`button-holder ${props.className} ${disabled ? 'disabled' : ''}`}>
        <a href={props.href}>
          <button
            disabled={props.disabled || disabled}
            style={{
              'width': props.width,
              background: props.color,
              color: props.fontColor
            }}
            type={props.type || 'button'}
            onClick={props.onClick}
          >
            <div className="button-content">
              {props.icon ? <div className="icon-box">{props.icon}</div> : null}
              {props.label ? <p className={getLabelClasses()}>{props.label}</p> : null}
            </div>
          </button>
        </a>
      </div>
    </div>
  );
};
