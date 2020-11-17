import React, { useState, useEffect, useContext, } from 'react';
import { ProgressPlugin } from 'webpack';
import { FormContext } from '../../contexts/FormContext';
import './text-field.scss';

export const Textfield = (props: {
  id: string,
  label: string,
  name: string,
  type: string,
  disabled?: boolean,
  equalField?: string,
  defaultvalue?: any,
  className?: string,
  items?: any[],
  tabIndex?: number,
  required?: boolean,
  onChange?: any,
  lowerCase?: boolean
}) => {

  const [value, setValue] = useState(props.defaultvalue || '');
  const [checked, setCheck] = useState(true);

  const {
    setField, getErrorByField, removeErrorByField, validationIsActive
  } = useContext(FormContext);

  useEffect(() => {
    setField(props.name, props.type, value, props.equalField, props.label);
    props.onChange && props.onChange(value);
  }, [value]);

  const handleChange = (e) => {
    if (props.type === 'checkbox') {
      setValue(checked)
      setCheck(value => !value)
    } else {
      setValue(e.target.value);
    }
  };

  const ErrorLabel = ({ value }) => {
    if (value) {
      return (
        <div>
          <label className="error-label theme-text">{value}</label>
        </div>
      )
    } else {
      return null;
    }
  };

  return (
    <div className={`textfield-box type-${props.type} ${props.className}`}>

      {/* top placeholder */}
      {/* {!value && (type !== 'select' && type !== 'checkbox') && < label className="internal-label">{label}</label>} */}

      {/* center placeholder */}
      { (props.type !== 'checkbox') && <label className="external-label">{props.label}</label>}

      {/* checkbox placeholder */}
      {(props.type === 'checkbox') && < label className="internal-label">{props.label}</label>}

      {props.type === "select" ? (
        <select
          id={props.id}
          name={props.name}
          onClick={(() => { removeErrorByField(props.name) })}
          onChange={handleChange}
          className={`select-box ${validationIsActive() && getErrorByField(props.name) && 'error'}`}
        >
          <option value={props.label}>{props.label}</option>
          {props.items.map((item, i) => {
            return <option key={i} value={item}>{item}</option>
          })}
        </select>
      ) : (
          <input
            id={props.id}
            disabled={props.disabled}
            onClick={(() => { removeErrorByField(props.name) })}
            className={`input-box ${validationIsActive() && getErrorByField(props.name) && 'error'}`}
            tabIndex={props.tabIndex}
            name={props.name}
            type={props.type || 'string'}
            required={props.required}
            value={value}
            autoFocus={false}
            onChange={handleChange}
          />
        )
      }

      {/* Error message  */}
      {validationIsActive() && getErrorByField(props.name) &&
        <ErrorLabel value={getErrorByField(props.name)} />}
    </div >
  )
}
