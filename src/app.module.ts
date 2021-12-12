import { Module } from '@nestjs/common';
import { AppController, EnquiryController } from './app.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, EnquiryController],
  providers: [PrismaService],
})
export class AppModule {}
