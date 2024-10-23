import { cn } from "@/lib/utils";
import type { WithoutChildren } from "@/types/utility-types";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import * as Dialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

export const DialogOverlay = forwardRef<HTMLDivElement, Dialog.DialogOverlayProps>(({ className, ...props }, ref) => (
  <Dialog.Overlay className={cn("absolute z-0 h-full w-full bg-black/30", className)} {...props} ref={ref} />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<HTMLDivElement, Dialog.DialogContentProps>(({ className, ...props }, ref) => (
  <Dialog.Content
    className={cn(
      "relative h-full w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-lg sm:h-4/5 sm:max-w-lg",
      className,
    )}
    {...props}
    ref={ref}
  />
));
DialogContent.displayName = "DialogContent";

interface DialogPortalProps {
  portal?: WithoutChildren<Dialog.DialogPortalProps>;
  div?: WithoutChildren<React.HTMLAttributes<HTMLDivElement>>;
  children: React.ReactNode;
}
export const DialogPortal = forwardRef<HTMLDivElement, DialogPortalProps>(
  ({ portal, div: { className, ...props } = {}, children }, ref) => (
    <Dialog.Portal {...portal}>
      <div className={cn("fixed inset-0 z-[65] grid place-items-center", className)} {...props} ref={ref}>
        {children}
      </div>
    </Dialog.Portal>
  ),
);
DialogPortal.displayName = "DialogPortal";

export const DialogClose = forwardRef<HTMLButtonElement, Dialog.DialogCloseProps>(({ className, ...props }, ref) => (
  <Dialog.Close
    className={cn(
      "fixed left-[calc(100%_-_3rem)] top-4 w-fit cursor-pointer rounded-full sm:absolute sm:right-4",
      className,
    )}
    {...props}
    ref={ref}
  >
    <XMarkIcon className="h-8 w-8 text-purple" />
  </Dialog.Close>
));
DialogClose.displayName = "DialogClose";
