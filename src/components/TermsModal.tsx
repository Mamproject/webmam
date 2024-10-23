"use client";

import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/i18n/i18n-config";
import { useStore } from "@/store";
import type { MdxDict } from "@/types/mdx-dict";
import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "./Dialog";
import LoadingFallback from "./LoadingFallback";
import MdxStyler from "./mdx-styler";

const mdxDict: MdxDict = {
  es: dynamic(() => import("@/i18n/mdx/terms-es.mdx"), {
    loading: () => <LoadingFallback />,
  }),
};

interface TermsModalProps {
  dictionary: Dictionary;
  locale: Locale;
}

/** The root and a trigger should be placed outside of the component */
const TermsModal: FC<TermsModalProps> = ({ dictionary, locale }) => {
  const MdxContent = mdxDict[locale];
  const setTermsModal = useStore((state) => state.setTermsModal);
  const termsModal = useStore((state) => state.termsModal);

  return (
    <Dialog.Root open={termsModal} onOpenChange={setTermsModal}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="flex flex-col">
          <DialogClose aria-label={dictionary.close} />
          <MdxStyler className="overflow-y-auto px-4 py-4 text-sm prose-headings:mt-4 md:px-8 md:py-8">
            <MdxContent />
          </MdxStyler>
        </DialogContent>
      </DialogPortal>
    </Dialog.Root>
  );
};

export default TermsModal;
