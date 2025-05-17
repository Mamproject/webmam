"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  `inline-flex items-center justify-center text-sm text-gray-500 font-medium ring-offset-white transition-colors
  hover:bg-purple/10
  focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50
  data-[state=on]:bg-purple data-[state=on]:text-white`,
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-purple/50 bg-transparent",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
