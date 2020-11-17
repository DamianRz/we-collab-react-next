import IntegrationBackend from '../utils/IntegrationBackend';
import ResultObject from '../utils/ResultObject';
import {
  RESERVE_ROUTE,
  POST_ENDPOIT,
  GET_ENDPOIT,
  PUT_ENDPOIT,
  PATCH_ENDPOIT,
} from '../types/Routes.type';
// eslint-disable-next-line no-unused-vars
import { IReserve } from '../types/Reserve.type';

export default class ReserveActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  //* Add reserve method
  public async add(reserve: IReserve) {
    //console.log('Accede Reserve Actions', reserve);
    try {
      const response: any = await this.backend.send(
        POST_ENDPOIT,
        reserve,
        `${RESERVE_ROUTE}/${reserve.clientId}`
      );
      if (response.status !== 201) {
        //console.log(response.message);
        throw Error(response.message);
      }
      //console.log('Reserve success \n', response.data);
      return response.data;
    } catch (error) {
      console.error('Error Reserve.actions method add -> ', error.message);
      return new ResultObject(404, error.message, {});
    }
  }
  //* Get reserve method
  public async getAll() {
    try {
      const response: any = await this.backend.send(
        GET_ENDPOIT,
        undefined,
        `${RESERVE_ROUTE}/active`
      );
      if (response.status !== 200) {
        throw Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.error('Error Reserve.actions method get all -> ', error.message);
      return null;
    }
  }
  //* Update reserve method
  public async update(reserve: IReserve) {
    /*
    Example of Reserve OBJ TO UPDATE:
    {   
        "reserveId":1,
        "barberOrHairdresserId": 1,
        "clientId": 1,
        "celClient": 94159988,
        "mailClient": "put.test.franco.salvohotmail.com",
        "workToDo": "CORTE+BARBA+CEJAS",
        "priceWork": 350,
        "additionalCost": 40,
        "startTime": "2020-09-21T12:00:14.396Z"
    }
    */
    try {
      const response: any = await this.backend.send(
        PUT_ENDPOIT,
        reserve,
        `${RESERVE_ROUTE}/update`
      );
      if (response.status !== 201) {
        //console.log(response.message);
        throw Error(response.message);
      }
      //console.log('Update reserve successfully: \n', response.data);
      return response.data;
    } catch (error) {
      console.error('Error Reserve.actions method update -> ', error.message);
      return new ResultObject(404, error.message, {});
    }
  }
  //* Complete reserve method
  public async doneReserve(barberId: number, reserveId: number) {
    /**
     * URL TO DONE RESERVE: /barber/{id_barber}/isdone/{id_reserve}
     */
    try {
      const response: any = await this.backend.send(
        PATCH_ENDPOIT,
        null,
        `${RESERVE_ROUTE}/barber/${barberId}/isdone/${reserveId}`
      );
      if (response.status !== 201) {
        //console.log(response.message);
        throw Error(response.message);
      }
      //console.log('Completed reserve successfully: \n', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error Reserve.actions method doneReserve -> ',
        error.message
      );
      return new ResultObject(404, error.message, {});
    }
  }
  //* Cancel reserve method
  public async cancel(clientId: number, reserveId: number) {
    /*
        URL TO CANCEL:  /reserve/client/${clientId}/cancel/${reserveId}
    */
    try {
      const response: any = await this.backend.send(
        PATCH_ENDPOIT,
        null,
        `${RESERVE_ROUTE}/client/${clientId}/cancel/${reserveId}`
      );
      if (response.status !== 201) {
        //console.log(response.message);
        throw Error(response.message);
      }
      //console.log('Canceled reserve successfully: \n', response.data);
      return response.data;
    } catch (error) {
      console.error('Error Reserve.actions method cancel -> ', error.message);
      return new ResultObject(404, error.message, {});
    }
  }
}
