"use client";

import Button from "@/components/Button";
import TermsField from "@/components/TermsField";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { useSendForm } from "@/hooks/use-send-form";
import { useValidation } from "@/hooks/useValidation";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { formErrorToast, formSuccessToast } from "@/utils/default-toasts";
import type { TCommonForm } from "@/utils/form-schemas";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  dictionary: Dictionary;
}

const PartnerForm: FC<Props> = ({ dictionary }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCommonForm>();
  const validation = useValidation(dictionary);
  const { onSubmit, loading } = useSendForm(
    "partner",
    {
      success: formSuccessToast(dictionary),
      error: formErrorToast(dictionary),
    },
    dictionary,
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
        <TextInput
          variant="white"
          {...register("firstName", validation.standardText())}
          label={dictionary.name}
          error={errors.firstName?.message}
        />
        <TextInput
          variant="white"
          {...register("lastName", validation.standardText())}
          label={dictionary.surname}
          error={errors.lastName?.message}
        />
        <TextInput
          variant="white"
          {...register("email", validation.email())}
          label={dictionary.email}
          error={errors.email?.message}
        />
        <TextInput
          variant="white"
          {...register("phone", {
            required: validation.required(),
            maxLength: validation.max(50),
          })}
          label={dictionary.phone}
          error={errors.phone?.message}
        />
        <TextInput
          variant="white"
          {...register("location", validation.standardText())}
          label={dictionary.location}
          error={errors.location?.message}
        />
      </div>
      <TextArea
        variant="white"
        className="mt-2"
        rows={5}
        {...register("message", { required: validation.required(), maxLength: validation.max(3000) })}
        label={dictionary.about_you}
        error={errors.message?.message}
      />
      <Controller
        name="terms"
        control={control}
        rules={{ validate: (value) => value === true || dictionary.accept_gdpr }}
        render={({ field }) => (
          <TermsField
            dictionary={dictionary}
            color="white"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.terms?.message}
          />
        )}
      />
      <div>
        <Button type="submit" className="w-fit" color="white" loading={loading}>
          {dictionary.send}
        </Button>
      </div>
    </form>
  );
};

export default PartnerForm;
