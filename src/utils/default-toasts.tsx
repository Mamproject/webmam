import { useToast } from "@/components/Toast";
import type { AppCookiesKeys } from "@/cookies/settings";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { useStore } from "@/store";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export const formErrorToast = (dictionary: Dictionary) =>
  ({
    status: "error",
    title: dictionary.form_error_title,
    description: (
      <span>
        {dictionary.form_error_description.replace("{email}", "")}
        <a className="inline-flex items-center gap-1 underline" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          email
          <ArrowTopRightOnSquareIcon className="inline h-4 w-4" />
        </a>
      </span>
    ),
  }) as const;

export const formSuccessToast = (dictionary: Dictionary) =>
  ({
    status: "success",
    title: dictionary.common_form_success,
    description: dictionary.common_form_success_description,
  }) as const;

export const useCookiesToast = (dictionary: Dictionary) => {
  const toast = useToast();
  const setCookiesModal = useStore((state) => state.setCookiesModal);

  return (...missingCookies: AppCookiesKeys[]) =>
    toast({
      status: "error",
      title: dictionary.form_error_title,
      description: dictionary.allow_cookies.replace("{cookies}", missingCookies.join(", ")),
      action: {
        label: dictionary.cookies_settings_btn,
        onClick: () => setCookiesModal(true),
        altText: dictionary.set_cookies_alternative,
      },
    });
};
