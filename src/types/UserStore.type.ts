export interface IUserStore {
  id?: number;
  username: string;
  passwd?: string;
  passwd2?: string;
  charge: string;
  isAdmin?: boolean;
  socialNumber: number;
  createOn?: string;
}
