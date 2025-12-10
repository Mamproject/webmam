"use client";

import Button from "@/components/Button";
import TermsField from "@/components/TermsField";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { useSendForm } from "@/hooks/use-send-form";
import { useValidation } from "@/hooks/useValidation";
import { useFormErrorToast, useFormSuccessToast } from "@/utils/default-toasts";
import type { TCommonForm } from "@/utils/form-schemas";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

const PartnerForm: FC = () => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCommonForm>();
  const validation = useValidation();
  const errorToast = useFormErrorToast();
  const successToast = useFormSuccessToast();
  const { onSubmit, loading } = useSendForm("partner", {
    success: successToast,
    error: errorToast,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
        <TextInput
          variant="white"
          {...register("firstName", validation.standardText())}
          label={t("forms.name")}
          error={errors.firstName?.message}
        />
        <TextInput
          variant="white"
          {...register("lastName", validation.standardText())}
          label={t("forms.surname")}
          error={errors.lastName?.message}
        />
        <TextInput
          variant="white"
          {...register("email", validation.email())}
          label={t("forms.email")}
          error={errors.email?.message}
        />
        <TextInput
          variant="white"
          {...register("phone", {
            required: validation.required(),
            maxLength: validation.max(50),
          })}
          label={t("forms.phone")}
          error={errors.phone?.message}
        />
        <TextInput
          variant="white"
          {...register("location", validation.standardText())}
          label={t("forms.location")}
          error={errors.location?.message}
        />
      </div>
      <TextArea
        variant="white"
        className="mt-2"
        rows={5}
        {...register("message", { required: validation.required(), maxLength: validation.max(3000) })}
        label={t("forms.about_you")}
        error={errors.message?.message}
      />
      <Controller
        name="terms"
        control={control}
        rules={{ validate: (value) => value === true || t("forms.accept_gdpr") }}
        render={({ field }) => (
          <TermsField
            color="white"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.terms?.message}
          />
        )}
      />
      <div>
        <Button type="submit" className="w-fit" color="white" loading={loading}>
          {t("common.send")}
        </Button>
      </div>
    </form>
  );
};

export default PartnerForm;
