import { Controller, Get, Header, Req } from '@nestjs/common';
import { Request } from 'express';
import { throwCollectedErrors } from '../utils/throw-collected-errors';
import { validateNotMoreThan, validateNumber } from '../validators';
import { UserService } from './user.service';
import { parseInteger } from 'src/utils/parse-integer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Header('Content-Type', 'application/json')
  @Get()
  async findMany(@Req() request: Request) {
    const query = request?.query as Record<string, string>;

    const take = parseInteger(query.take);
    const skip = parseInteger(query.skip);

    await throwCollectedErrors([
      () => take && validateNumber(take, 'take'),
      () => take && validateNotMoreThan(take, 100, 'take'),
      () => skip && validateNumber(skip, 'skip'),
    ]);

    return this.userService.findMany({ take, skip });
  }
}
