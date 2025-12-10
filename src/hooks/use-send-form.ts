"use client";

import { submitFormAction } from "@/actions/submit-form/submit-form-action";
import type { ImperativeToastInput } from "@/components/Toast";
import { useToast } from "@/components/Toast";
import { grecaptchaActions } from "@/settings/grecaptcha-actions";
import { useCookiesToast } from "@/utils/default-toasts";
import type { TFormKeys } from "@/utils/form-schemas";
import { isGrecaptchaLoaded } from "@/utils/grecaptcha";
import { useTransition } from "react";
import type { SubmitHandler } from "react-hook-form";

export type TFormData = Record<string, unknown>;

export interface ToastData {
  success: ImperativeToastInput;
  error: ImperativeToastInput;
}

export const useSendForm = (formKey: TFormKeys, toastData: ToastData) => {
  const [loading, startTransition] = useTransition();
  const toast = useToast();
  const toastCookieError = useCookiesToast();

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    toast(undefined);
    if (!isGrecaptchaLoaded()) return toastCookieError("google");
    const token = await generateGrecaptchaToken(grecaptchaActions.contactForm);
    startTransition(() => {
      submitFormAction({ ...data, token, formKey }).then((status) => toast(toastData[status.status]));
    });
  };

  return { loading, onSubmit };
};

export const generateGrecaptchaToken = (action: string) =>
  new Promise<string>((resolve) => {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_GRECAPTCHA_KEY!, {
        action,
      });
      resolve(token);
    });
  });
