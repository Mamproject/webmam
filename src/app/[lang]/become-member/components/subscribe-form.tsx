"use client";

import Button from "@/components/Button";
import TermsField from "@/components/TermsField";
import TextInput from "@/components/TextInput";
import { useSendForm } from "@/hooks/use-send-form";
import { useValidation } from "@/hooks/useValidation";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { formErrorToast } from "@/utils/default-toasts";
import type { TSubscribeForm } from "@/utils/form-schemas";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  dictionary: Dictionary;
}

const SubscribeForm: FC<Props> = ({ dictionary }) => {
  const validation = useValidation(dictionary);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TSubscribeForm>();
  const { onSubmit, loading } = useSendForm(
    "subscribe",
    {
      success: {
        status: "success",
        title: dictionary.subscribe_success,
        description: dictionary.subscribe_success_description,
      },
      error: formErrorToast(dictionary),
    },
    dictionary,
  );

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelClassName="lg:text-2xl"
        className="lg:mt-2"
        variant="purple"
        {...register("email", validation.email())}
        label={dictionary.write_email}
        error={errors.email?.message}
      />
      <Controller
        name="terms"
        control={control}
        rules={{ validate: (value) => value === true || dictionary.accept_gdpr }}
        render={({ field }) => (
          <TermsField
            labelClassName="md:text-base"
            dictionary={dictionary}
            color="purple"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.terms?.message}
          />
        )}
      />
      <div>
        <Button type="submit" className="flex gap-2 px-8" loading={loading}>
          <span>{dictionary.subscribe}</span>
          <ArrowLongRightIcon className="h-7 w-7 text-white" />
        </Button>
      </div>
    </form>
  );
};

export default SubscribeForm;
