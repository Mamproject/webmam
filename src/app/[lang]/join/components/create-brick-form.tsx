"use client";

import Button from "@/components/Button";
import TermsField from "@/components/TermsField";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { useSendForm } from "@/hooks/use-send-form";
import { useValidation } from "@/hooks/useValidation";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { formErrorToast, formSuccessToast } from "@/utils/default-toasts";
import type { TCreateBrickForm } from "@/utils/form-schemas";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  dictionary: Dictionary;
  sectionClicked: string;
}

const CreateBrickForm: FC<Props> = ({ dictionary, sectionClicked }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCreateBrickForm>();
  const validation = useValidation(dictionary);
  const { onSubmit, loading } = useSendForm(
    "createBrick",
    {
      success: formSuccessToast(dictionary),
      error: formErrorToast(dictionary),
    },
    dictionary,
  );

  return (
    <form className="flex flex-col gap-4 px-4 md:px-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 text-base">
        <input type="hidden" {...register("sectionClicked", { value: sectionClicked })} />
        <TextInput
          variant="purple"
          {...register("firstName", validation.standardText())}
          label={dictionary.name}
          error={errors.firstName?.message}
        />
        <TextInput
          variant="purple"
          {...register("lastName", validation.standardText())}
          label={dictionary.surname}
          error={errors.lastName?.message}
        />
        <TextInput
          variant="purple"
          {...register("email", validation.email())}
          label={dictionary.email}
          error={errors.email?.message}
        />
        <TextInput
          variant="purple"
          {...register("phone", {
            required: validation.required(),
            maxLength: validation.max(50),
          })}
          label={dictionary.phone}
          error={errors.phone?.message}
        />
        <TextInput
          variant="purple"
          {...register("location", validation.standardText())}
          label={dictionary.location}
          error={errors.location?.message}
        />
      </div>
      {/* TODO: remove textarea */}
      <TextArea
        variant="purple"
        className="mt-2"
        labelClassName="text-base"
        rows={5}
        {...register("message", { required: validation.required(), maxLength: validation.max(3000) })}
        label={dictionary.event_data_label}
        error={errors.message?.message}
      />
      <Controller
        name="terms"
        control={control}
        rules={{ validate: (value) => value === true || dictionary.accept_gdpr }}
        render={({ field }) => (
          <TermsField
            labelClassName="text-base"
            dictionary={dictionary}
            color="purple"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.terms?.message}
          />
        )}
      />
      <div>
        <Button type="submit" className="w-fit" loading={loading}>
          {dictionary.send}
        </Button>
      </div>
    </form>
  );
};

export default CreateBrickForm;
