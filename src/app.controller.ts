import {
  Controller,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('users')
export class AppController {
  @Header('Content-Type', 'application/json')
  @Post()
  findAll(@Req() request: Request) {
    return prisma.user.findMany({
      take: request.body.take ?? 10,
      skip: request.body.skip,
    });
  }
}
