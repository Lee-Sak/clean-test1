import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { GetUserInfoUseCase } from './domain/usecase/getUserInfo.usecase';
import { SignInUseCase } from './domain/usecase/signIn.usecase';
import { NmailService } from './infra/adapter/naver-email.service';
import { UserEntity } from './infra/db/entity/user.entity';
import { UserRepository } from './infra/db/repository/user.repository';
import { UsersController } from './interface/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'EmailService', useClass: NmailService },
    SignInUseCase,
    GetUserInfoUseCase,
    EmailService,
  ],
})
export class UsersModule {}
