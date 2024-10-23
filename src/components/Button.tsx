import { antonio } from "@/assets/fonts";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps} from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import { forwardRef } from "react";
import Spinner from "./Spinner";

const button = cva(`relative z-0 font-bold transition-colors duration-200 ${antonio.className}`, {
  variants: {
    color: {
      white: "",
      purple: "",
    },
    variant: {
      primary: "hover:bg-opacity-80",
      minimal: "underline hover:text-opacity-80",
    },
    size: {
      md: "px-2 py-1.5 text-lg",
      sm: "px-1.5 py-1",
    },
  },
  compoundVariants: [
    {
      color: "white",
      variant: "primary",
      className: "bg-white text-purple",
    },
    {
      color: "purple",
      variant: "primary",
      className: "bg-purple text-white",
    },
    {
      color: "white",
      variant: "minimal",
      className: "text-white",
    },
    {
      color: "purple",
      variant: "minimal",
      className: "text-purple",
    },
  ],
  defaultVariants: {
    color: "purple",
    variant: "primary",
    size: "md",
  },
});

type ButtonVariantProps = VariantProps<typeof button>;

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonVariantProps>,
    ButtonVariantProps {
  onClick?: () => void;
  loading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, variant, color, size, className, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={button({
          variant,
          color,
          size,
          className: cx(loading && "cursor-not-allowed [&>*:not(.spinner)]:opacity-0", className),
        })}
        disabled={loading}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {typeof children === "string" ? <span>{children}</span> : children}
            {loading && (
              <span className="spinner absolute inset-0 grid place-items-center">
                <Spinner className="h-5 w-5" />
              </span>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
