import type { VariantProps} from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { InputHTMLAttributes} from "react";
import { forwardRef } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  labelClassName?: string;
}

export const labelVariants = cva("flex flex-col gap-1", {
  variants: {
    variant: {
      purple: "text-black",
      white: "text-white",
    },
  },
  defaultVariants: {
    variant: "purple",
  },
});

export const inputVariants = cva("border-2 p-2 text-gray-600 ", {
  variants: {
    variant: {
      purple: "border-purple-200",
      white: "border-gray-300",
    },
  },
  defaultVariants: {
    variant: "purple",
  },
});

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ variant, label, labelClassName, className, error, ...inputProps }, ref) => (
    <label className={labelVariants({ variant, className: labelClassName })}>
      <div className="flex flex-wrap items-end justify-between">
        <span className="mr-2">{label}</span>
        {error && <span className="text-base font-semibold text-red-900">{error}</span>}
      </div>
      <input ref={ref} {...inputProps} className={inputVariants({ variant, className })} />
    </label>
  ),
);

TextInput.displayName = "TextInput";

export default TextInput;
