import {
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

const prisma = new PrismaClient();

@Controller('users')
export class AppController {
  @Header('Content-Type', 'application/json')
  @Post()
  findAll(@Req() request: Request) {
    if (request.body.take > 100) {
      throw new Error('"take" cannot be more 100');
    }
    return prisma.user.findMany(request.body);
  }
}

@Controller('enquiries')
export class EnquiryController {
  @Header('Content-Type', 'application/json')
  @Post()
  findAll(@Req() request: Request) {
    if (request.body.take > 100) {
      throw new Error('"take" cannot be more 100');
    }
    return prisma.enquiry.findMany(request.body);
  }
  @Header('Content-Type', 'application/json')
  @Put()
  create(@Req() request: Request) {
    return prisma.enquiry.create({
      data: request.body,
    });
  }
}
