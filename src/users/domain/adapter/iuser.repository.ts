import { User } from '../entity/user';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User>;
  save: (
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) => Promise<void>;
  findById: (id: number) => Promise<User>;
}
