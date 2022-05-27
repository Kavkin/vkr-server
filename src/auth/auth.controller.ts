import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
const prisma = new PrismaClient();
interface RegistrationBody {
  email: string;
  password: string;
}
interface LoginBody {
  email: string;
  password: string;
}
interface AuthBody {
  id: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  @Header('Content-Type', 'application/json')
  @Post('registration')
  async registaration(@Body() body: RegistrationBody) {
    const { email, password } = body;
    const candidate = await prisma.user.findFirst({ where: { email } });
    if (candidate) {
      throw new Error(`User with email ${email} already exist`);
    }
    const hashPassword = await hash(password, 8);
    const user = await prisma.user.create({
      data: { email, password: hashPassword },
    });
    return user;
  }
  @Header('Content-Type', 'application/json')
  @Post('login')
  async login(@Body() body: LoginBody) {
    const { email, password } = body;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new HttpException(
        `User not found ${email} `,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPassValid = await hash(password, user.password);

    if (!isPassValid) {
      throw new Error(`Invalid password `);
    }

    const token = sign(
      { id: user.id },
      process.env.JWT_TOKEN_KEY || 'secretKey',
      {
        expiresIn: '1h',
      },
    );
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    };
  }
  @Header('Content-Type', 'application/json')
  @Get('auth')
  async auth(@Body() userInput: AuthBody) {
    const user = await prisma.user.findFirst({ where: { id: userInput.id } });
    const token = sign(
      { id: user.id },
      process.env.JWT_TOKEN_KEY || 'secretKey',
      {
        expiresIn: '1h',
      },
    );
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    };
  }
}
