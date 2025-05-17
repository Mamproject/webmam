import type { Dictionary } from "@/i18n/dictionaries/es";
import { rEmail } from "@/utils/regex";

export const useValidation = (dictionary: Dictionary) => {
  const max = (max: number) => ({
    value: max,
    message: maxLengthError(dictionary, max),
  });
  const required = () => ({
    value: true,
    message: dictionary.required_field,
  });
  const email = () => ({
    required: required(),
    pattern: { value: rEmail, message: dictionary.invalid_email },
    maxLength: { value: 255, message: maxLengthError(dictionary, 255) },
  });
  const standardText = () => ({
    required: required(),
    maxLength: max(255),
  });

  return { max, required, email, standardText };
};

const maxLengthError = (dict: Dictionary, max: number) => dict.max_length.replace("{max}", max.toString());
