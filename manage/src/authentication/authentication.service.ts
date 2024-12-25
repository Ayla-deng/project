/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthenticationService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<AuthEntity> {
    // 步骤1：根据给定的电子邮件获取用户信息。
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // 如果没有找到用户，则抛出一个错误。
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // 步骤2：检查密码是否正确。
    const isPasswordValid = user.password === password;

    // 如果密码不匹配，则抛出一个错误
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // 步骤3：生成一个包含用户ID的JWT（JSON Web Token），并返回它。
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
