import { Controller, Header, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { throwCollectedErrors } from './utils/throw-collected-errors';
import { validateNotMoreThan, validateNumber } from './validators';

const prisma = new PrismaClient();

@Controller('users')
export class AppController {
  @Header('Content-Type', 'application/json')
  @Post()
  async findAll(@Req() request: Request) {
    await throwCollectedErrors([
      () => validateNumber(request.body.take, 'take'),
      () => validateNumber(request.body.skip, 'skip'),
      () => validateNotMoreThan(request.body.take, 100, 'take'),
    ]);

    return prisma.user.findMany({
      take: request.body.take ?? 10,
      skip: request.body.skip,
    });
  }
}
