import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnquiryController } from './enquiry/enquiry.controller';
import { EnquiryService } from './enquiry/enquiry.service';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, EnquiryController, AuthController],
  providers: [PrismaService, EnquiryService],
})
export class AppModule {}
