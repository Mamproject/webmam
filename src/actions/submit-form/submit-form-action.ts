"use server";

import type { TFormData } from "@/hooks/use-send-form";
import type { TForm, TFormKeys, TSentForm } from "@/utils/form-schemas";
import { FormSchemas, SentFormSchema } from "@/utils/form-schemas";
import { Value } from "@sinclair/typebox/value";
import { sendEmail } from "./aux/send-email";
import { validateCaptcha } from "./aux/validate-captcha";
import { grecaptchaActions } from "@/settings/grecaptcha-actions";

interface ContactFormStatus {
  status: "success" | "error";
}

export async function submitFormAction(formData: TFormData): Promise<ContactFormStatus> {
  try {
    const body = validateSchema(formData);
    await validateCaptcha(body.token, grecaptchaActions.contactForm);
    await sendEmail(body as TSentForm & TForm[TFormKeys]);
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}

const validateSchema = (body: unknown) => {
  const validMeta = Value.Check(SentFormSchema, body);
  if (!validMeta) throw new Error("Invalid form");

  const { formKey } = body as TSentForm;
  const validData = Value.Check(FormSchemas[formKey], body);
  const { terms } = Value.Cast(FormSchemas[formKey], body);
  if (!validData || !terms) throw new Error("Invalid form");

  return body as TSentForm;
};
