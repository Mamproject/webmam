import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { useTransition } from "react";
import Button from "./Button";
import { acceptAll, rejectAll } from "@/cookies/cookies-actions";
import { useToast } from "./Toast";

interface CookiesBannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openSettings: () => void;
}

const CookiesBanner: FC<CookiesBannerProps> = ({ open, onOpenChange, openSettings }) => {
  const t = useTranslations();
  const toast = useToast();
  const [loadingAccept, startTransitionAccept] = useTransition();
  const [loadingReject, startTransitionReject] = useTransition();

  const processAction = async (action: () => Promise<void>) => {
    try {
      await action();
      onOpenChange(false);
    } catch {
      toast({
        status: "error",
        title: t("cookies.cookies_error_title"),
        description: t("cookies.cookies_error_description"),
      });
    }
  };

  const handleAcceptAll = () => startTransitionAccept(() => processAction(acceptAll));

  const handleRejectAll = () => startTransitionReject(() => processAction(rejectAll));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          className="from-purple data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom fixed inset-x-0 bottom-0 z-60 border-t border-t-purple-200 bg-linear-to-t to-purple-400"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col justify-between gap-3 p-4 lg:flex-row lg:items-center">
            <Dialog.DialogTitle className="sr-only">{t("cookies.cookies_policy")}</Dialog.DialogTitle>
            <Dialog.DialogDescription className="text-base font-light text-white lg:max-w-prose">
              {t("cookies.cookies_banner_text")}
            </Dialog.DialogDescription>

            <div className="flex flex-row-reverse flex-wrap justify-end gap-2 whitespace-nowrap lg:flex-nowrap">
              <Button
                onClick={handleAcceptAll}
                className="w-full sm:w-fit"
                size="sm"
                color="white"
                loading={loadingAccept}
              >
                {t("cookies.cookies_accept_btn")}
              </Button>
              <Button
                onClick={handleRejectAll}
                className="w-full sm:w-fit"
                size="sm"
                color="white"
                loading={loadingReject}
              >
                {t("cookies.cookies_reject_btn")}
              </Button>
              <Button onClick={openSettings} className="w-full sm:w-fit" size="sm" variant="minimal" color="white">
                {t("cookies.cookies_settings_btn")}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CookiesBanner;
