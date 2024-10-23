export function pickAttributes<O extends Record<string, unknown>, K extends (keyof O)[]>(
  obj: O,
  pick: K,
): Pick<O, K[number]> {
  const res = {} as Pick<O, K[number]>;
  pick.forEach((key) => {
    res[key] = obj[key];
  });
  return res;
}
