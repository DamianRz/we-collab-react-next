// eslint-disable-next-line no-unused-vars
import { IBarber } from '../types/Barber.type';
import IntegrationBackend from '../utils/IntegrationBackend';
import {
    BARBER_ROUTE,
    GET_ENDPOIT,
} from '../types/Routes.type';

export default class BarberActions {
    private backend: IntegrationBackend = new IntegrationBackend();
    public async getAll() {
        try {
            const responseBarbers: any = await this.backend.send(
                GET_ENDPOIT,
                undefined,
                BARBER_ROUTE
            );
            if(responseBarbers.status != 200){
                throw Error(`Error Status code: , ${responseBarbers.status}`)
            }
            return responseBarbers.data;
        } catch (error) {
            console.error(`Error: Obteniendo barberos -> ${error}`);
            return [];
        }
    }
}