import { Module } from '@nestjs/common';
import { UsersController } from './interface/users.controller';

@Module({
  controllers: [UsersController]
})
export class UsersModule {}
