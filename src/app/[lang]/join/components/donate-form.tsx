"use client";

import { checkoutSessionAction } from "@/actions/submit-form/checkout-session-action";
import Button from "@/components/Button";
import TermsField from "@/components/TermsField";
import TextInput from "@/components/TextInput";
import { useToast } from "@/components/Toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useValidation } from "@/hooks/useValidation";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/i18n/i18n-config";
import { useCookiesToast } from "@/utils/default-toasts";
import type { TCheckoutForm } from "@/utils/form-schemas";
import getStripe from "@/utils/get-stripe";
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
  dictionary: Dictionary;
  locale: Locale;
  initialFormValues?: TCheckoutForm;
}

const DonateForm: FC<DonateFormProps> = ({
  dictionary,
  locale,
  initialFormValues = { frequency: frequencyOptions.monthly },
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCheckoutForm>({
    defaultValues: initialFormValues,
  });
  const validation = useValidation(dictionary);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const cookiesErrorToast = useCookiesToast(dictionary);

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
    } catch (error) {
      toast({
        status: "error",
        title: dictionary.form_error_title,
        description: dictionary.retry_or_contact.replace("{email}", process.env.NEXT_PUBLIC_EMAIL!),
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
            <span>{dictionary.donation_frequency}</span>
            <ToggleGroup variant="outline" type="single" className="w-fit" onValueChange={onChange} {...field}>
              <ToggleGroupItem value={frequencyOptions.oneTime}>{dictionary.donate_once}</ToggleGroupItem>
              <ToggleGroupItem value={frequencyOptions.monthly}>{dictionary.donate_monthly}</ToggleGroupItem>
              <ToggleGroupItem value={frequencyOptions.quarterly}>{dictionary.donate_quarterly}</ToggleGroupItem>
              <ToggleGroupItem value={frequencyOptions.yearly}>{dictionary.donate_yearly}</ToggleGroupItem>
            </ToggleGroup>
          </label>
        )}
      />
      <TextInput
        labelClassName="w-fit"
        className="w-fit"
        type="number"
        step={0.01}
        label={dictionary.donation_amount}
        error={errors.amount?.message}
        {...register("amount", {
          ...validation.required,
          min: { value: 1, message: dictionary.donation_amount_min.replace("{min}", "1") },
        })}
      />
      <Controller
        name="terms"
        control={control}
        rules={{ validate: (value) => value === true || dictionary.accept_gdpr }}
        render={({ field }) => (
          <TermsField
            dictionary={dictionary}
            color="purple"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.terms?.message}
          />
        )}
      />
      <div>
        <Button type="submit" className="w-fit" color="purple" loading={isLoading}>
          {dictionary.continue}
        </Button>
      </div>
    </form>
  );
};

export default DonateForm;
