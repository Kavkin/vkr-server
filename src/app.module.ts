import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnquiryController } from './enquiry/enquiry.controller';
import { EnquiryService } from './enquiry/enquiry.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, EnquiryController],
  providers: [PrismaService, EnquiryService],
})
export class AppModule {}
