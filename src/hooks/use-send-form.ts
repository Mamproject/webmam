"use client";

import { submitFormAction } from "@/actions/submit-form/submit-form-action";
import type { ImperativeToastInput } from "@/components/Toast";
import { useToast } from "@/components/Toast";
import type { Dictionary } from "@/i18n/dictionaries/es";
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

export const useSendForm = (formKey: TFormKeys, toastData: ToastData, dictionary: Dictionary) => {
  const [loading, startTransition] = useTransition();
  const toast = useToast();
  const toastCookieError = useCookiesToast(dictionary);

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    console.log("Formulario enviado:", data);

    toast(undefined);

    if (!isGrecaptchaLoaded()) {
      console.error("Google reCAPTCHA no está cargado.");
      return toastCookieError("google");
    }

    try {
      console.log("Generando token de reCAPTCHA...");
      const token = await generateGrecaptchaToken(grecaptchaActions.contactForm);
      console.log("Token generado:", token);

      startTransition(() => {
        submitFormAction({ ...data, token, formKey })
          .then((status) => {
            console.log("Respuesta del backend:", status);
            toast(toastData[status.status]);
          })
          .catch((error) => {
            console.error("Error en la respuesta del backend:", error);
            toast(toastData.error);
          });
      });
    } catch (error) {
      console.error("Error generando token de reCAPTCHA:", error);
      toast(toastData.error);
    }
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
