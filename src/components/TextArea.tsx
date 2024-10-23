import type { VariantProps } from "class-variance-authority";
import type { TextareaHTMLAttributes} from "react";
import { forwardRef } from "react";
import { inputVariants, labelVariants } from "./TextInput";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof inputVariants> {
  label?: string;
  labelClassName?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant, error, label, labelClassName, className, ...textareaProps }, ref) => (
    <label className={labelVariants({ variant, className: labelClassName })}>
      <div className="flex flex-wrap items-end justify-between">
        <span>{label}</span>
        {error && <span className="text-base font-semibold text-red-900">{error}</span>}
      </div>
      <textarea ref={ref} {...textareaProps} className={inputVariants({ variant, className })} />
    </label>
  ),
);

TextArea.displayName = "TextArea";

export default TextArea;
