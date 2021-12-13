import { HttpException } from '@nestjs/common';

export async function throwCollectedErrors(validators: (() => void)[]) {
  const errors = [];

  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i];

    try {
      validator();
    } catch ({ message, key, value }) {
      errors.push({ message, key, value });
    } finally {
      if (errors.length !== 0 && i === validators.length - 1) {
        throw new HttpException(
          { errors, message: 'ValidationError', errcode: 'EINVALID' },
          401,
        );
      }
    }
  }
}
