export interface IReserve {
  // Reserve identification info
  reserveId?: number;
  barberOrHairdresserId: number; // ID Barbero que haga la reserva o Peluquera/o.
  clientId: number;
  nameClient: string;
  barberName?: string;
  mailClient: string;
  celClient: string;
  socialNumber?: number;

  startTime: string; //Reserve Time dd/mm/yyyy HH:MM:SS - Java Instant time
  startTimeFront?: string;
  endTime?: string; // dd/mm/yyyy HH:MM:SS - Java Instant time
  reserveDay?: string; // Dia de la reservacion -> Tengo que añadirlo en el backend

  // Reserve Description Info
  workId?: number;
  workToDo?: string; // Nombre del trabajo EJ: CORTE+BARBA+CEJAS
  priceWork: number; // precio
  workTime?: number; // duracion del corte EJ: 30 min

  additionalCost?: number; // Tiempos del los servicios, puede ser fijo o individuales Ej: 30 min
  totalCost?: number; // Tiempos del los servicios, puede ser fijo o individuales Ej: 30 min

  // Reserve Analytics info
  createOn?: number; // dd/mm/yyyy HH:MM:SS - Java Instant time
  createBy?: number; // barber name
  updateBy?: number; // barber name
  updateOn?: number; // dd/mm/yyyy HH:MM:SS - Java Instant time
  isActive?: boolean;
}

export const defaultReserve: IReserve = {
  barberOrHairdresserId: -1,
  celClient: '',
  clientId: -1,
  mailClient: '',
  nameClient: '',
  priceWork: 0,
  startTime: '',
  socialNumber: undefined,
};
