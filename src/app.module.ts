import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnquiryController } from './enquiry/enquiry.controller';
import { EnquiryService } from './enquiry/enquiry.service';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    EnquiryController,
    AuthController,
    UserController,
  ],
  providers: [PrismaService, EnquiryService],
})
export class AppModule {}
