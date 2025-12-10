"use client";

import { useStore } from "@/store";
import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import type { MDXProps } from "mdx/types";
import { useTranslations, useLocale } from "next-intl";
import type { FC } from "react";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "./Dialog";
import LoadingFallback from "./LoadingFallback";
import MdxStyler from "./mdx-styler";

const mdxDict: Record<string, React.ComponentType<MDXProps>> = {
  es: dynamic(() => import("@/i18n/mdx/terms-es.mdx"), {
    loading: () => <LoadingFallback />,
  }),
};

/** The root and a trigger should be placed outside of the component */
const TermsModal: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const MdxContent = mdxDict[locale];
  const setTermsModal = useStore((state) => state.setTermsModal);
  const termsModal = useStore((state) => state.termsModal);

  return (
    <Dialog.Root open={termsModal} onOpenChange={setTermsModal}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="flex flex-col">
          <DialogClose aria-label={t("common.close")} />
          <Dialog.DialogTitle className="sr-only">{t("terms.privacy_policy")}</Dialog.DialogTitle>
          <MdxStyler className="prose-headings:mt-4 overflow-y-auto px-4 py-4 text-sm md:px-8 md:py-8">
            <MdxContent />
          </MdxStyler>
        </DialogContent>
      </DialogPortal>
    </Dialog.Root>
  );
};

export default TermsModal;
