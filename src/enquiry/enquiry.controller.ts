import { Body, Controller, Get, Header, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { EnquiryService } from './enquiry.service';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Controller('enquiries')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Header('Content-Type', 'application/json')
  @Get()
  findMany(@Req() request: Request) {
    const take = request.query.take
      ? parseInt(request.query.take as string)
      : undefined;
    return this.enquiryService.findMany({ take });
  }

  @Header('Content-Type', 'application/json')
  @Put()
  create(@Req() request: Request) {
    return prisma.enquiry.create({
      data: request.body,
    });
  }
}
