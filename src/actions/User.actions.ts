import IntegrationBackend from '../utils/IntegrationBackend';
import {
  GET_ENDPOIT,
  USER_SIGN_IN_ROUTE,
  USER_ROUTE,
  POST_ENDPOIT,
} from '../types/Routes.type';
import { IUser } from '../types/User.type';
export default class UserActions {
  private backend: IntegrationBackend = new IntegrationBackend();

  //! Nosotros utilizamos el endpoint de clients login para loaguear un nuevo cliente, este mismo crea un usuario.
  /* login = async (client: { email: string; password: string }) => {
    try {
      let data = {
        email: client.email,
        password: client.password,
      };
      const response: any = await this.backend.send(
        GET_ENDPOIT,
        data,
        USER_SIGN_IN_ROUTE
      );
      if (response.status !== 200) {
        //console.log('response ', response)
        throw Error(`Error al ingresar estos datos, 
                      \npor favor verifique ( Email ) o (Social Number, si es Socio) 
                      \nO por ultimo su password. `);
      }
      return response.data;
    } catch (error) {
      console.error('error: ', JSON.stringify(error));
      return null;
    }
  };
*/
  //! Nosotros utilizamos el endpoint de clients Add para añadir un nuevo cliente, este mismo crea un usuario.
  /* Deprecated 
  register = async (user: IUser) => {
    try {
      const data: IUser = {
        username: user.username,
        email: user.email,
        password: user.password,
        cel: user.cel,
        admin: user.admin,
        barberId: user.barberId,
        createOn: user.createOn,
        fullName: user.fullName,
        socialNumber: user.socialNumber ? user.socialNumber : undefined,
        status: user.status,
        userId: user.userId,
      };
      const response: any = await this.backend.send(
        POST_ENDPOIT,
        data,
        USER_ROUTE
      );
      if (response.status !== 201) {
        //console.log('Error on create client', response.message);
        return Error(
          'Error al crear usuario, Usuario o Email ya estan ocupados.. \nPruebe loguearse con este usuario & email. '
        );
      }
      //console.log('success post client');
      return response.data;
    } catch (error) {
      return 'Ocurrio un error! Vuelva a intentarlo';
    }
  };
  */
}
