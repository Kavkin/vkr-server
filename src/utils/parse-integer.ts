export function parseInteger(string?: string): number | undefined {
  if (string === undefined) {
    return;
  }

  const integer = parseInt(string, 10);

  return !integer ? undefined : integer;
}
