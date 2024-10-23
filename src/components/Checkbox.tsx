"use client";

import ThickCheckIcon from "@/assets/thick-check-icon";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { VariantProps} from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode} from "react";
import React, { forwardRef } from "react";

const checkbox = cva("h-5 w-5 shrink-0 border disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer", {
  variants: {
    color: {
      purple: "border-purple-300 data-[state=checked]:bg-purple-300 text-white",
      white: "border-white data-[state=checked]:bg-white text-purple",
    },
  },
  defaultVariants: {
    color: "purple",
  },
});

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkbox> & {
    label?: ReactNode;
    additionalClasses?: {
      container?: string;
      label?: string;
    };
  };

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, color, label, additionalClasses, ...props }, ref) => (
    <label className={cx("inline-flex items-center", additionalClasses?.container)}>
      <CheckboxPrimitive.Root ref={ref} className={checkbox({ className, color })} {...props}>
        <CheckboxPrimitive.Indicator className={cx("flex items-center justify-center")}>
          <ThickCheckIcon className="h-3 w-3 fill-current" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <div className={cx("ml-2 cursor-pointer", additionalClasses?.label)}>{label}</div>}
    </label>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
