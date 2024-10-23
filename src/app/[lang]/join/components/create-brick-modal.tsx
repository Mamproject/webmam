"use client";

import Heading from "@/components/Heading";
import type { Dictionary } from "@/i18n/dictionaries/es";
import * as Dialog from "@radix-ui/react-dialog";
import type { FC } from "react";
import CreateBrickForm from "./create-brick-form";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from "@/components/Dialog";

const CreateBrickModal: FC<{
  dictionary: Dictionary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionClicked: string;
}> = ({ dictionary, open, onOpenChange, sectionClicked }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className="flex flex-col py-4">
        <DialogClose aria-label={dictionary.close} />
        <Dialog.Title asChild>
          <Heading level={2} color="purple" className="px-4 uppercase">
            {dictionary.create_brick}
          </Heading>
        </Dialog.Title>

        <CreateBrickForm dictionary={dictionary} sectionClicked={sectionClicked} />
      </DialogContent>
    </DialogPortal>
  </Dialog.Root>
);
export default CreateBrickModal;
