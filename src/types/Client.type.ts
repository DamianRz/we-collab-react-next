export interface IClient {
  // User Information
  clientId?: number;
  userId?: number;
  name: string;
  username: string;
  password: string;
  repeatPassword?: string;
  email: string;
  cel: string;

  socialNumber?: number;

  startDate?: string; // dd/mm/yyyy HH:MM:SS - Java Instant time
  endDate?: string; // dd/mm/yyyy HH:MM:SS - Java Instant time

  // Analytics information
  amountReserves?: number;
  interactions?: string;
  lastDateUpdated?: string; // dd/mm/yyyy HH:MM:SS - Java Instant time
  clientType?: string; // Double
  status?: boolean;
}

export const defaultClient: IClient = {
  cel: '',
  email: '',
  name: '',
  password: '',
  username: '',
  userId: -1,
  socialNumber: undefined,
};
