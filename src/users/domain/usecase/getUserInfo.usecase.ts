import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../adapter/iuser.repository';
import * as uuid from 'uuid';
import { User } from '../entity/user';
import { UserInfo } from 'src/users/interface/dto-res/userInfo';

@Injectable()
export class GetUserInfoUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: IUserRepository, // mysql, oracle ..
  ) {}

  async execute(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
