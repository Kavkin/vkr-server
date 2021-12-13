import { assertNotMoreThan, assertNumber, assertString } from './assertions';

interface ValidationParams {
  message: string;
  key: string;
  value: unknown;
  value2?: string;
  key2?: string;
}

export class ValidationError extends Error {
  message: string;
  value: unknown;
  key: string;
  value2?: string;
  key2?: string;

  constructor(data: ValidationParams) {
    super(data.message);
    this.value = data.value;
    this.key = data.key;
    this.value2 = data.value2;
    this.key2 = data.key2;
  }
}

export function validateString(input: unknown, key: string): void {
  try {
    assertString(input);
  } catch ({ message }) {
    throw new ValidationError({ value: input, key, message });
  }
}

export function validateNumber(input: unknown, key: string): void {
  try {
    assertNumber(input);
  } catch ({ message }) {
    throw new ValidationError({ value: input, key, message });
  }
}

export function validateNotMoreThan(
  input: unknown,
  num: number,
  key: string,
): void {
  try {
    assertNotMoreThan(input, num);
  } catch ({ message }) {
    throw new ValidationError({ value: input, key, message });
  }
}
