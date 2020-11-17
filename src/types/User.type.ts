export interface IUser {
  username: string;
  fullName: string;
  email: string;
  password: string;
  password2?: string;
  cel: string;
  createOn: string;
  admin: boolean;
  userId: number;
  socialNumber?: number;
  barberId: number;
  status: boolean;
}

export const defaultUser = {
  username: '',
  fullName: '',
  email: '',
  cel: '',
  password: '',
  admin: false,
  barber: true,
  status: true,
  userId: 1,
  socialNumber: 0,
};
