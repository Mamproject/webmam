"use client";

import type { Dictionary } from "@/i18n/dictionaries/es";
import { useStore } from "@/store";
import type { Root as CheckboxRoot } from "@radix-ui/react-checkbox";
import type { ElementRef } from "react";
import { forwardRef } from "react";
import type { CheckboxProps } from "./Checkbox";
import Checkbox from "./Checkbox";

interface TermsFieldProps extends Omit<CheckboxProps, "label"> {
  dictionary: Dictionary;
  error?: string;
  labelClassName?: string;
}

const TermsField = forwardRef<ElementRef<typeof CheckboxRoot>, TermsFieldProps>(
  ({ labelClassName, dictionary, error, ...checkboxProps }, ref) => {
    const setTermsModal = useStore((state) => state.setTermsModal);

    const label = (
      <p className={labelClassName}>
        <span>{dictionary.accept_terms_1}</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setTermsModal(true);
          }}
          className="inline font-medium underline"
        >
          {dictionary.accept_terms_2}
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
