"use client";

import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import type { FC } from "react";
import CreateBrickForm from "./create-brick-form";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "@/components/Dialog";

const CreateBrickModal: FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionClicked: string;
}> = ({ open, onOpenChange, sectionClicked }) => {
  const t = useTranslations();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="flex flex-col py-4">
          <DialogClose aria-label={t("common.close")} />
          <Dialog.Title asChild>
            <Heading level={2} color="purple" className="px-4 uppercase">
              {t("createBrick.create_brick")}
            </Heading>
          </Dialog.Title>

          <CreateBrickForm sectionClicked={sectionClicked} />
        </DialogContent>
      </DialogPortal>
    </Dialog.Root>
  );
};
export default CreateBrickModal;
