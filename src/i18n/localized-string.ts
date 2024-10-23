declare const localized: unique symbol;
export type LocalizedString = string & {
  readonly [localized]: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lk = (strs: TemplateStringsArray, ...values: any[]): LocalizedString => {
  // This combines the TemplateStringsArray and values into a single string
  let result = "";
  for (let i = 0; i < values.length; i++) {
    result += strs[i] + values[i];
  }
  result += strs[strs.length - 1];

  // Return the combined string as a LocalizedString
  return result as LocalizedString;
};
