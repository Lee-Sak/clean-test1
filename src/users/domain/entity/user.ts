import { UserEntity } from 'src/users/infra/db/entity/user.entity';
import { IEntity } from './ientity';

export class User implements IEntity<UserEntity> {
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private password: string,
    private signupVerifyToken: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.signupVerifyToken = signupVerifyToken;
  }

  getInstance() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      signupVerifyToken: this.signupVerifyToken,
    };
  }
}
