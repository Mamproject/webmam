"use client";

import type { AppCookies } from "@/cookies/settings";
import * as Dialog from "@radix-ui/react-dialog";
import type { MDXProps } from "mdx/types";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import type { ComponentType, FC } from "react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Heading from "./Heading";
import { useToast } from "./Toast";
import MdxStyler from "./mdx-styler";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "./Dialog";
import LoadingFallback from "./LoadingFallback";

interface CookiesModalProps {
  cookies: AppCookies;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSavedPreferences: () => void;
  customizeCookiesAction: (cookies: AppCookies) => Promise<void>;
}

const LazyEsPolicy = dynamic(() => import("@/i18n/mdx/cookies-es.mdx"), {
  loading: () => <LoadingFallback />,
});

const PoliciesDict: Record<string, ComponentType<MDXProps>> = {
  es: LazyEsPolicy,
};

const CookiesModal: FC<CookiesModalProps> = ({
  cookies,
  open,
  onOpenChange,
  onSavedPreferences,
  customizeCookiesAction,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const Policy = PoliciesDict[locale];
  const toast = useToast();
  const [loading, startTransition] = useTransition();
  const { handleSubmit, control } = useForm<AppCookies>({ defaultValues: cookies });

  const onSubmit = (data: AppCookies) => {
    toast(undefined);
    startTransition(async () => {
      try {
        await customizeCookiesAction(data);
        toast({
          status: "success",
          title: t("forms.common_form_success"),
          description: t("cookies.preferences_saved"),
          duration: 5000,
          hideCloseButton: true,
        });
        onSavedPreferences();
      } catch {
        toast({
          status: "error",
          title: t("forms.form_error_title"),
          description: t("cookies.preferences_not_saved"),
          duration: 5000,
          hideCloseButton: true,
        });
      }
    });
  };

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose aria-label={t("common.close")} />

          <Dialog.Title className="sr-only">{t("cookies.cookies_policy")}</Dialog.Title>
          <MdxStyler className="prose-headings:mt-4 overflow-y-auto px-4 py-4 text-sm md:px-8 md:py-8">
            <Dialog.Title asChild>
              <Heading level={2} color="purple" className="mt-0 uppercase">
                {t("cookies.cookies_policy")}
              </Heading>
            </Dialog.Title>
            <Policy
              consentForm={
                <form className="flex flex-col gap-4 pl-4" onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    control={control}
                    name="essential"
                    render={({ field: { value, onChange, ...field } }) => (
                      <Checkbox
                        label={t("cookies.accept_cookies_cookie")}
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="google"
                    render={({ field: { value, onChange, ...field } }) => (
                      <Checkbox
                        label={t("cookies.google_cookies")}
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="stripe"
                    render={({ field: { value, onChange, ...field } }) => (
                      <Checkbox
                        label={t("cookies.stripe_cookies")}
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    )}
                  />
                  <Button type="submit" variant="primary" size="sm" className="w-fit" loading={loading}>
                    {t("cookies.save_preferences")}
                  </Button>
                </form>
              }
              components={{
                h2: ({ children }) => (
                  <Heading level={3} color="purple" className="mt-8!">
                    {children}
                  </Heading>
                ),
              }}
            />
          </MdxStyler>
        </DialogContent>
      </DialogPortal>
    </Dialog.Root>
  );
};

export default CookiesModal;
