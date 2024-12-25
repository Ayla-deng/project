/* eslint-disable prettier/prettier */
//定义一个 new AuthEntity 来描述 JWT 有效负载的形状
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;
}