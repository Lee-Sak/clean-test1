import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/entity/user';
import { IUserRepository } from 'src/users/domain/adapter/iuser.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ email });
    if (!userEntity) {
      return null;
    }

    const { id, name, signupVerifyToken, password } = userEntity;

    return new User(id, name, email, password, signupVerifyToken);
  }

  async save(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ): Promise<void> {
    await this.userRepository.insert({
      name,
      email,
      password,
      signupVerifyToken,
    });
  }

  async findById(id: number): Promise<User> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      return null;
    }
    const { name, email, signupVerifyToken, password } = userEntity;

    return new User(id, name, email, password, signupVerifyToken);
  }
}
