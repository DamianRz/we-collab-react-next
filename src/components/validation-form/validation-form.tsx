import React, { useState, useEffect, ReactElement } from 'react';
import { Button } from '../button';
import { StepperFooter } from '../reserve-modal/stepper-footer';
import './validation-form.scss';

export const ValidationForm = (props: {
  objectTest?: object;
  equalFields?: { field1: string; field2: string; error: string }[];
  children: React.ReactChild | React.ReactChild[];
  buttonClassName?: string;
  // buttonLabel: string,
  hideButton?: boolean;
  lastFieldUpdate?: string;
  onValidationChange?: any;
  //StepperFooter
  prevButtonLabel: string;
  nextButtonLabel: string;
  updaButtonLabel: string;
  onPrevButtonClick: any;
  onUpdateButtonClick: any;
  onClick: () => void;
  onChangeErrors?: () => undefined;
}) => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(true);

  useEffect(() => {
    loadFields();
  }, []);

  // useEffect(() => {
  //     // props.onValidationChange(validate());
  // }, [props.lastFieldUpdate])

  useEffect(() => {
    setErrors([]);
    loadFields();
  }, [props.objectTest]);

  const loadFields = () => {
    let requiredFields = [];
    React.Children.toArray(props.children).forEach((child: ReactElement) => {
      if (child.props['required'] === true) {
        requiredFields.push({
          name: child.props['name'],
          type: child.props['type'],
        });
      }
    });
    setFields(requiredFields);
  };

  const ErrorLabel = (props: { value: string[] }) => {
    if (props.value && showErrors) {
      return (
        <div>
          {props.value.map((error, i) => {
            return (
              <label key={i} className="error-label">
                {error}
              </label>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  const validate = () => {
    let success: boolean = true;
    let errorsList = [];
    fields.forEach((field: { name: string; type: string }) => {
      let fieldValue = props.objectTest[field.name];
      if (!validateString(fieldValue)) {
        // field is empty
        errorsList.push({ name: field.name, error: `El campo es requerido` });
        success = false;
      } else {
        // field have text
        switch (field.type) {
          case 'string':
            if (!/^[A-Za-z\s]+$/.test(fieldValue)) {
              errorsList.push({
                name: field.name,
                error: `Debe ingresar solo letras`,
              });
            }
            break;
          case 'password':
            // its ok
            break;
          case 'email':
            if (
              !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue)
            ) {
              errorsList.push({
                name: field.name,
                error: `El email no es correco`,
              });
              success = false;
            }
            break;
          case 'number':
            if (!/^[0-9]+$/.test(fieldValue)) {
              errorsList.push({
                name: field.name,
                error: `Debe ingresar solo numeros`,
              });
            }
            break;
        }
      }
    });
    // Equals fields
    if (props.equalFields) {
      props.equalFields.forEach((item) => {
        let field1 = props.objectTest[item.field1];
        let field2 = props.objectTest[item.field2];
        if (field1 != field2) {
          errorsList.push({ name: item.field2, error: item.error });
          success = false;
        }
      });
    }
    setErrors(errorsList);
    return success;
  };

  const validateString = (value: string) => {
    if (value === '') {
      return false;
    } else {
      return true;
    }
  };

  const onClickValidate: any = () => {
    if (validate()) {
      props.onClick();
    }
  };

  const getErrorByField = (fieldName: string) => {
    let selectedErrors = errors.filter((error: any) => {
      return error.name === fieldName;
    });
    let fieldErrors: string[] = [];
    selectedErrors.forEach((selectedError: { name: string; error: string }) => {
      fieldErrors.push(selectedError.error);
    });
    return fieldErrors;
  };

  const getChidrens = () => {
    return React.Children.map(
      props.children,
      (child: ReactElement, i: number) => {
        return (
          <div key={i}>
            {child}
            <ErrorLabel value={getErrorByField(child.props.name)} />
          </div>
        );
      }
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>{getChidrens()}</div>
      {!props.hideButton ? (
        <StepperFooter
          nextButtonLabel={props.nextButtonLabel}
          prevButtonLabel={props.prevButtonLabel}
          updateButtonLabel={props.updaButtonLabel}
          onNextButtonClick={() => {
            onClickValidate();
          }}
          onPrevButtonClick={props.onPrevButtonClick}
          onUpdateButtonClick={props.onUpdateButtonClick}
        />
      ) : null}
    </div>
  );
};
