import { useTranslations } from "next-intl";
import { rEmail } from "@/utils/regex";

export const useValidation = () => {
  const t = useTranslations();

  const max = (max: number) => ({
    value: max,
    message: t("forms.max_length", { max }),
  });
  const required = () => ({
    value: true,
    message: t("forms.required_field"),
  });
  const email = () => ({
    required: required(),
    pattern: { value: rEmail, message: t("forms.invalid_email") },
    maxLength: { value: 255, message: t("forms.max_length", { max: 255 }) },
  });
  const standardText = () => ({
    required: required(),
    maxLength: max(255),
  });

  return { max, required, email, standardText };
};
