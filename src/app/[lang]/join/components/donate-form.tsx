"use client";

import { checkoutSessionAction } from "@/actions/submit-form/checkout-session-action";
import Button from "@/components/Button";
import TermsField from "@/components/TermsField";
import TextInput from "@/components/TextInput";
import { useToast } from "@/components/Toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useValidation } from "@/hooks/useValidation";
import { useCookiesToast } from "@/utils/default-toasts";
import type { TCheckoutForm } from "@/utils/form-schemas";
import getStripe from "@/utils/get-stripe";
import { useTranslations, useLocale } from "next-intl";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

const frequencyOptions = {
  oneTime: "one-time",
  monthly: "monthly",
  quarterly: "quarterly",
  yearly: "yearly",
} satisfies Record<string, TCheckoutForm["frequency"]>;

interface DonateFormProps {
  initialFormValues?: TCheckoutForm;
}

const DonateForm: FC<DonateFormProps> = ({ initialFormValues = { frequency: frequencyOptions.monthly } }) => {
  const t = useTranslations();
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCheckoutForm>({
    defaultValues: initialFormValues,
  });
  const validation = useValidation();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const cookiesErrorToast = useCookiesToast();

  const onSubmit: SubmitHandler<TCheckoutForm> = async ({ amount, ...data }) => {
    toast(undefined);
    setIsLoading(true);
    try {
      const res = await checkoutSessionAction({
        ...data,
        amount: amount * 100,
        origin: window.location.origin,
        locale,
      });
      if (res.status === "error") throw new Error("Error generating stripe client secret");
      const stripe = await getStripe();
      if (!stripe) return cookiesErrorToast("stripe");
      stripe.redirectToCheckout({ sessionId: res.sessionId });
    } catch {
      toast({
        status: "error",
        title: t("forms.form_error_title"),
        description: t("forms.retry_or_contact", { email: process.env.NEXT_PUBLIC_EMAIL! }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStripe();
  }, []);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="frequency"
        control={control}
        defaultValue="monthly"
        render={({ field: { onChange, ...field } }) => (
          <label className="flex flex-col gap-1">
            <span>{t("donate.donation_frequency")}</span>
            <ToggleGroup variant="outline" type="single" className="w-fit" onValueChange={onChange} {...field}>
              <ToggleGroupItem value={frequencyOptions.oneTime}>{t("donate.donate_once")}</ToggleGroupItem>
              <ToggleGroupItem value={frequencyOptions.monthly}>{t("donate.donate_monthly")}</ToggleGroupItem>
              <ToggleGroupItem value={frequencyOptions.quarterly}>{t("donate.donate_quarterly")}</ToggleGroupItem>
              <ToggleGroupItem value={frequencyOptions.yearly}>{t("donate.donate_yearly")}</ToggleGroupItem>
            </ToggleGroup>
          </label>
        )}
      />
      <TextInput
        labelClassName="w-fit"
        className="w-fit"
        type="number"
        step={0.01}
        label={t("donate.donation_amount")}
        error={errors.amount?.message}
        {...register("amount", {
          ...validation.required,
          min: { value: 1, message: t("donate.donation_amount_min", { min: 1 }) },
        })}
      />
      <Controller
        name="terms"
        control={control}
        rules={{ validate: (value) => value === true || t("forms.accept_gdpr") }}
        render={({ field }) => (
          <TermsField
            color="purple"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.terms?.message}
          />
        )}
      />
      <div>
        <Button type="submit" className="w-fit" color="purple" loading={isLoading}>
          {t("common.continue")}
        </Button>
      </div>
    </form>
  );
};

export default DonateForm;
