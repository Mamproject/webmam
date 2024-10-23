"use client";

import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { FC, PropsWithChildren, ReactNode} from "react";
import { createContext, useContext, useState } from "react";

export interface ToastProps {
  status?: "success" | "error" | "neutral";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  action?: {
    label: ReactNode;
    altText: string;
    onClick: () => void;
  };
  duration?: number;
  hideCloseButton?: boolean;
}
export type ImperativeToastInput = Omit<ToastProps, "open" | "onOpenChange"> | undefined;
export type ToastFn = (toast: ImperativeToastInput) => void;

const Toast: FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  action,
  status = "neutral",
  duration,
  hideCloseButton,
}) => {
  const Icon = {
    success: <CheckCircleIcon className="h-8 w-8 text-green-500" />,
    error: <ExclamationCircleIcon className="h-8 w-8 text-red-500" />,
    neutral: null,
  }[status];

  return (
    <ToastPrimitive.Root
      open={open}
      duration={duration || 10000}
      onOpenChange={onOpenChange}
      className="relative flex items-center gap-x-4 rounded-md border border-purple bg-gray-50 p-4 shadow-lg data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
    >
      {!hideCloseButton && <ToastClose />}

      <div>{Icon}</div>

      <div className="flex flex-grow flex-col gap-1">
        <ToastPrimitive.Title className="text-base font-medium text-black">{title}</ToastPrimitive.Title>
        <div className="flex items-center gap-4">
          <ToastPrimitive.Description className="text-sm text-gray-600">{description}</ToastPrimitive.Description>
          {action && (
            <ToastPrimitive.Action asChild altText={action.altText}>
              <button
                onClick={action.onClick}
                className="inline-flex h-fit w-fit items-center justify-center rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]"
              >
                {action.label}
              </button>
            </ToastPrimitive.Action>
          )}
        </div>
      </div>
    </ToastPrimitive.Root>
  );
};

interface ToastContextData {
  toast: (toast: ToastProps) => void;
}
const ToastContext = createContext<ToastContextData>({ toast: () => {} });

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | undefined>(undefined);

  return (
    <ToastContext.Provider value={{ toast: setToast }}>
      <ToastPrimitive.Provider>
        {children}
        {toast && <Toast {...toast} open={!!toast} onOpenChange={(open) => !open && setToast(undefined)} />}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[70] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-4 p-[var(--viewport-padding)] outline-none [--viewport-padding:_1.5rem]" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { toast } = useContext(ToastContext);
  return toast as ToastFn;
};

const ToastClose = () => (
  <ToastPrimitive.Close className="absolute right-2 top-2 z-10 rounded-md text-gray-300 hover:text-gray-800 focus-visible:text-gray-800">
    <XMarkIcon className="h-4 w-4" />
  </ToastPrimitive.Close>
);

export default Toast;
