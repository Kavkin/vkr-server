import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
interface UserBody {
  email: string;
  password: string;
  name: string;
  phone: string;
}
@Controller('users')
export class UserController {
  @Header('Content-Type', 'application/json')
  @Get()
  async getUsers() {
    return prisma.user.findMany();
  }
  @Header('Content-Type', 'application/json')
  @Delete()
  async pruneMany(@Body() body: any): Promise<Prisma.BatchPayload> {
    const ids = body;

    return prisma.user.deleteMany({ where: { id: { in: ids } } });
  }
}
