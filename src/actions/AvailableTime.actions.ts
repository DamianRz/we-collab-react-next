import IntegrationBackend from '../utils/IntegrationBackend';
import { RESERVE_DATES_ROUTE, GET_ENDPOIT } from '../types/Routes.type';

export default class AvailableTime {
  private backend: IntegrationBackend = new IntegrationBackend();

  /* Burn data */
  async getBarberShopTime() {
    return [
      '10:00',
      '10:40',
      '11:20',
      '12:00',
      '12:40',
      '13:20',
      '14:00',
      '14:40',
      '15:20',
      '16:00',
      '16:40',
      '17:20',
      '18:00',
      '18:40',
    ];
  }

  /* Firebase query */
  //getReservatesHoursByReserves(barberName: string) {
  //  let reserves: any[] = [];
  //  try {
  //    db.collection('reservas')
  //      .doc(barberName)
  //      .collection('day_reserves')
  //      .orderBy('date', 'asc')
  //      .onSnapshot((snapshot) => {
  //        snapshot.docs.map((doc) => {
  //          reserves.push(doc.data());
  //        });
  //      });
  //    return reserves;
  //  } catch (error) {
  //    console.error(`Error: Obteniendo las reservas -> ${error}}`);
  //    return [];
  //  }
  //}

  /* Deprecated */
  async getDatesByReserves(barberId: number) {
    try {
      const responseDates: any = await this.backend.send(
        GET_ENDPOIT,
        undefined,
        `${RESERVE_DATES_ROUTE}/${barberId}`
      );
      if (responseDates.status != 200) {
        throw Error(`Error Status code: , ${responseDates.status}`);
      }
      // Formatting data
      let formattingData = [];
      responseDates.data.forEach((item: { date: string; hours: string[] }) => {
        formattingData.push({ date: item.date, hours: [...item.hours] });
      });
      return responseDates.data;
    } catch (error) {
      console.error(`Error: Obteniendo fecha de reservas -> ${error}`);
      return [];
    }
  }

  /* For tests */
  async getDatesByReservesTest(barberId: number) {
    return [
      { date: '2020-08-26', hours: ['16:00', '16:30', '17:00'] },
      { date: '2020-08-27', hours: ['14:30', '15:00', '15:30', '17:00'] },
      { date: '2020-08-28', hours: ['14:00', '14:30', '15:00', '15:30'] },
      {
        date: '2020-08-29',
        hours: ['14:00', '15:30', '16:00', '16:30', '17:00'],
      },
    ];
  }
}
