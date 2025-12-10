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

const CommitteeForm: FC = () => {
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
  const { onSubmit, loading } = useSendForm("committee", {
    success: successToast,
    error: errorToast,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
        <TextInput
          variant="purple"
          {...register("firstName", validation.standardText())}
          label={t("forms.name")}
          error={errors.firstName?.message}
        />
        <TextInput
          variant="purple"
          {...register("lastName", validation.standardText())}
          label={t("forms.surname")}
          error={errors.lastName?.message}
        />
        <TextInput
          variant="purple"
          {...register("email", validation.email())}
          label={t("forms.email")}
          error={errors.email?.message}
        />
        <TextInput
          variant="purple"
          {...register("phone", {
            required: validation.required(),
            maxLength: validation.max(50),
          })}
          label={t("forms.phone")}
          error={errors.phone?.message}
        />
        <TextInput
          variant="purple"
          {...register("location", validation.standardText())}
          label={t("forms.location")}
          error={errors.location?.message}
        />
      </div>
      <TextArea
        variant="purple"
        className="mt-2"
        rows={5}
        {...register("message", { required: validation.required(), maxLength: validation.max(3000) })}
        label={t("committee.committee_form_message")}
        error={errors.message?.message}
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
        <Button type="submit" className="w-fit" loading={loading}>
          {t("common.send")}
        </Button>
      </div>
    </form>
  );
};

export default CommitteeForm;
