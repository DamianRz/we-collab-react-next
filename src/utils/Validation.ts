import { Dispatch, SetStateAction } from "react";

export default class Validation {
  private fieldsFail: any = [];
  // public onChangeErrors: Dispatch<SetStateAction<any[]>> = new Dispatch<SetStateAction<any[]>>;

  validateFields(object: any, fieldsArrays: any[]) {
    this.fieldsFail = [];
    let noErrors = true;

    fieldsArrays.forEach(
      (fieldArray: { objectName: string; fields: string[][] }) => {
        fieldArray.fields.forEach((field: string[]) => {
          switch (field[1]) {
            case 'string':
              if (object[field[0]] === '') {
                noErrors = false;
                const fieldError = {
                  name: field[0],
                  form: fieldArray.objectName,
                  error: 'El campo es requerido'
                };
                this.fieldsFail.push(fieldError);
              }
              break;
            case 'number':
              if (Number(object[field[0]]).toString() === 'NaN') {
                noErrors = false;
                const fieldError = {
                  name: field[0],
                  form: fieldArray.objectName,
                  error: 'El campo solo debe contener numeros'
                };
                this.fieldsFail.push(fieldError);
              }
              break;
          }
        });
      }
    );
    // this.onChangeErrors(this.fieldsFail);
    return noErrors;
  }

  // get the error of the field, if not have errors return ''
  get(route: string, errorList: any[]) {
    // 'objectName.field'
    let errorString = '';
    const objectName = route.split('.')[0];
    const fieldName = route.split('.')[1];

    errorList.forEach((field: any) => {
      if (field.form == objectName && field.name == fieldName) {
        errorString = field.error;
      }
    });
    return errorString;
  }

  clearFails() {
    this.fieldsFail = [];
  }

  // return object clean
  clearObject(object: any) {
    try {
      Object.keys(object).forEach((key: any) => {
        if (key != 'formName') {
          object[key].value = '';
        }
      });
      return object;
    } catch (error) {
      return object;
    }
  }



  validatePassword(passwd1: string, passwd2: string) {
    if (passwd1 === passwd2) {
      return true;
    } else {
      // this.onChangeErrors(this.fieldsFail);
      // errorsFields.push(
      //   {
      //     name: 'password2',
      //     form: 'registerFields',
      //     error: 'Las contraseñas no coinciden'
      //   }
      // )
      return false;
    }
  }


  validateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
}
