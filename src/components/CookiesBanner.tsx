import type { Dictionary } from "@/i18n/dictionaries/es";
import * as Dialog from "@radix-ui/react-dialog";
import type { FC } from "react";
import { useTransition } from "react";
import Button from "./Button";
import { acceptAll, rejectAll } from "@/cookies/cookies-actions";
import { useToast } from "./Toast";

interface CookiesBannerProps {
  dictionary: Dictionary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openSettings: () => void;
}

const CookiesBanner: FC<CookiesBannerProps> = ({ dictionary, open, onOpenChange, openSettings }) => {
  const toast = useToast();
  const [loadingAccept, startTransitionAccept] = useTransition();
  const [loadingReject, startTransitionReject] = useTransition();

  const processAction = async (action: () => Promise<void>) => {
    try {
      await action();
      onOpenChange(false);
    } catch (error) {
      toast({
        status: "error",
        title: dictionary.cookies_error_title,
        description: dictionary.cookies_error_description,
      });
    }
  };

  const handleAcceptAll = () => startTransitionAccept(() => processAction(acceptAll));

  const handleRejectAll = () => startTransitionReject(() => processAction(rejectAll));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className="z-60 bg-linear-to-t from-purple data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom fixed inset-x-0 bottom-0 border-t border-t-purple-200 to-purple-400"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col justify-between gap-3 p-4 lg:flex-row lg:items-center">
            <Dialog.DialogTitle className="sr-only">{dictionary.cookies_policy}</Dialog.DialogTitle>
            <Dialog.DialogDescription className="text-base font-light text-white lg:max-w-prose">
              {dictionary.cookies_banner_text}
            </Dialog.DialogDescription>

            <div className="flex flex-row-reverse flex-wrap justify-end gap-2 whitespace-nowrap lg:flex-nowrap">
              <Button
                onClick={handleAcceptAll}
                className="w-full sm:w-fit"
                size="sm"
                color="white"
                loading={loadingAccept}
              >
                {dictionary.cookies_accept_btn}
              </Button>
              <Button
                onClick={handleRejectAll}
                className="w-full sm:w-fit"
                size="sm"
                color="white"
                loading={loadingReject}
              >
                {dictionary.cookies_reject_btn}
              </Button>
              <Button onClick={openSettings} className="w-full sm:w-fit" size="sm" variant="minimal" color="white">
                {dictionary.cookies_settings_btn}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CookiesBanner;
