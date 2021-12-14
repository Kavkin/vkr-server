import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FindManyParams } from 'src/type';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async findMany(params: FindManyParams) {
    return prisma.user.findMany({
      take: params.take ?? 10,
      skip: params.skip,
    });
  }
}
