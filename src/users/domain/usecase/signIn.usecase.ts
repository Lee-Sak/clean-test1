import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../adapter/iuser.repository';
import * as uuid from 'uuid';
import { IEmailService } from '../adapter/iemail.service';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: IUserRepository, // mysql, oracle ..
    @Inject('EmailService') private emailService: IEmailService, // gmail, naver, ...
  ) {}

  async execute(email: string, password: string, name: string): Promise<void> {
    const isUserExist = await this.userRepository.findByEmail(email);
    if (isUserExist) {
      throw new HttpException('해당 이메일은 이미 존재합니다.', 400);
    }

    const signupVerifyToken = uuid.v1();
    // save, removeById, updateById
    // mysql에서 orcacle로 변경되어도 밑에 코드는 바뀌지 않음
    await this.userRepository.save(name, email, password, signupVerifyToken);
    // 이메일 전송
    // 이메일이 goggle에서 naver로 바껴도 밑에 부분은 변하지 않음
    this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
