import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUserInfoUseCase } from '../domain/usecase/getUserInfo.usecase';
import { SignInUseCase } from '../domain/usecase/signIn.usecase';
import { UserInfo } from './dto-res/userInfo';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly getUserInfoUseCase: GetUserInfoUseCase,
  ) {}

  @Post()
  async postOne(@Body() dto: CreateUserDto): Promise<string> {
    const { email, password, name } = dto;
    await this.signInUseCase.execute(email, password, name);
    return 'success';
  }
  // dto 검증, 유스케이스 실행, 해당 요청에 대한 응답
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<UserInfo> {
    const user = await this.getUserInfoUseCase.execute(id);
    return this.returnParse(['id', 'name', 'email'], user);
  }

  returnParse(propertys: string[], object: any) {
    const instance = object.getInstance();
    const propertyArr = Object.getOwnPropertyNames(object);
    propertyArr.map((e) => {
      if (!propertys.includes(e)) {
        delete instance[e];
      }
    });
    return instance;
  }
}
