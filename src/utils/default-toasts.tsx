import { useToast } from "@/components/Toast";
import type { AppCookiesKeys } from "@/cookies/settings";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export const useFormErrorToast = () => {
  const t = useTranslations();
  return {
    status: "error" as const,
    title: t("forms.form_error_title"),
    description: (
      <span>
        {t.rich("forms.form_error_description", {
          email: process.env.NEXT_PUBLIC_EMAIL!,
          link: (email) => (
            <a className="inline-flex items-center gap-1 underline" href={`mailto:${email}`}>
              {email}
              <ArrowTopRightOnSquareIcon className="inline h-4 w-4" />
            </a>
          ),
        })}
      </span>
    ),
  };
};

export const useFormSuccessToast = () => {
  const t = useTranslations();
  return {
    status: "success" as const,
    title: t("forms.common_form_success"),
    description: t("forms.common_form_success_description"),
  };
};

export const useCookiesToast = () => {
  const t = useTranslations();
  const toast = useToast();
  const setCookiesModal = useStore((state) => state.setCookiesModal);

  return (...missingCookies: AppCookiesKeys[]) =>
    toast({
      status: "error",
      title: t("forms.form_error_title"),
      description: t("cookies.allow_cookies", { cookies: missingCookies.join(", ") }),
      action: {
        label: t("cookies.cookies_settings_btn"),
        onClick: () => setCookiesModal(true),
        altText: t("cookies.set_cookies_alternative"),
      },
    });
};
