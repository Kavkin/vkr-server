import { Injectable } from '@nestjs/common';
import { Enquiry, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EnquiryService {
  async findMany(params): Promise<Enquiry[]> {
    return prisma.enquiry.findMany(params);
  }

  async findOne(params): Promise<Enquiry> {
    return prisma.enquiry.findFirst(params);
  }

  async create(params): Promise<Enquiry> {
    return prisma.enquiry.create({ data: params });
  }

  async remove(params): Promise<Enquiry> {
    return prisma.enquiry.delete(params);
  }

  async update(params): Promise<Enquiry> {
    return prisma.enquiry.update(params);
  }
}
