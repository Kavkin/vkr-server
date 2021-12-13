export function assertNumber(input: unknown): asserts input is number {
  if (typeof input === 'number' || input instanceof Number) {
    return;
  }

  throw Error('is not number');
}

export function assertString(input: unknown): asserts input is string {
  if (typeof input === 'string' || input instanceof String) {
    return;
  }

  throw Error('is not string');
}

export function assertNotMoreThan(input: unknown, num: number): void {
  assertNumber(input);

  if (input < num) {
    return;
  }

  throw Error(`more than ${num}`);
}
