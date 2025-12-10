"use client";

import { useStore } from "@/store";
import type { Root as CheckboxRoot } from "@radix-ui/react-checkbox";
import { useTranslations } from "next-intl";
import type { ComponentRef } from "react";
import { forwardRef } from "react";
import type { CheckboxProps } from "./Checkbox";
import Checkbox from "./Checkbox";

interface TermsFieldProps extends Omit<CheckboxProps, "label"> {
  error?: string;
  labelClassName?: string;
}

const TermsField = forwardRef<ComponentRef<typeof CheckboxRoot>, TermsFieldProps>(
  ({ labelClassName, error, ...checkboxProps }, ref) => {
    const t = useTranslations();
    const setTermsModal = useStore((state) => state.setTermsModal);

    const label = (
      <p className={labelClassName}>
        <span>{t("terms.accept_terms_1")}</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setTermsModal(true);
          }}
          className="inline font-medium underline"
        >
          {t("terms.accept_terms_2")}
        </a>
      </p>
    );

    return (
      <div className="flex flex-col">
        {error && <span className="text-base font-semibold text-red-900">{error}</span>}
        <Checkbox {...checkboxProps} label={label} ref={ref} />
      </div>
    );
  },
);

TermsField.displayName = "TermsField";

export default TermsField;
