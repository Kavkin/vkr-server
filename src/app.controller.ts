import { Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
const enquryList = [
  {
    name: 'ilya',
    age: 12,
    address: '5avenu',
    done: false,
  },
  {
    name: 'vlad',
    age: 13,
    address: '1avenu',
    done: false,
  },
  {
    name: 'sasha',
    age: 0,
    address: '53avenu',
    done: false,
  },
];
@Controller('enquries')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Header('Content-Type', 'application/json')
  @Post()
  findAll(@Req() request: Request): string {
    return JSON.stringify(enquryList);
  }
}
