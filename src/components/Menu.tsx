"use client";

import { antonio } from "@/assets/fonts";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { LocalizedString } from "@/i18n/localized-string";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import type { FC } from "react";
import { useState } from "react";
import { MenuSectionLink, MenuSectionWrapper, MenuSubsectionLink } from "./MenuSection";

export interface MenuProps {
  dictionary: Dictionary;
  open: boolean;
  onClose: () => void;
  closeLabel: LocalizedString;
}

type AccordionTriggerType = "hover" | "native";
/** A record of item value, to trigger type  */
type AccordionState = Record<string, AccordionTriggerType>;

const Menu: FC<MenuProps> = ({ open, onClose, closeLabel, dictionary }) => {
  const [accordionState, setAccordionState] = useState<AccordionState>({});
  const accordionValues = Object.keys(accordionState);

  const getAccordionItemHandlers = (key: string) => ({
    // TODO: Marina asked for this feature but the UX is not good enough
    // onMouseEnter: () => {
    //   setAccordionState((prevState) => (prevState[key] === "native" ? prevState : { ...prevState, [key]: "hover" }));
    // },
    // onMouseLeave: () =>
    //   setAccordionState((prevState) => {
    //     if (prevState[key] === "native") return prevState;
    //     const newState = { ...prevState };
    //     delete newState[key];
    //     return newState;
    //   }),
    onClick: () =>
      setAccordionState((prevState) => {
        const prevNativeActive = prevState[key] === "native";
        const newState = { ...prevState };
        if (prevNativeActive) {
          delete newState[key];
        } else {
          newState[key] = "native";
        }
        return newState;
      }),
  });

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content
          className={`fixed inset-y-0 z-50 animate-slide-in-left overflow-y-auto bg-white p-4 data-[state=closed]:animate-slide-out-left md:p-6 ${antonio.className}`}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex justify-between gap-4">
            <Accordion.Root value={accordionValues} type="multiple" className="flex flex-col gap-3">
              <MenuSectionLink title={"Mam Project" as LocalizedString} href="/" />
              <MenuSectionWrapper title={dictionary.us} {...getAccordionItemHandlers(dictionary.us)}>
                <MenuSubsectionLink title={dictionary.about_us} href="/about" />
                <MenuSubsectionLink title={dictionary.bridge_people} href="/about#bridge_people" />
              </MenuSectionWrapper>
              <MenuSectionLink title={dictionary.violet_bricks} href="/violet-bricks" />
              <MenuSectionWrapper title={dictionary.join_mam} {...getAccordionItemHandlers(dictionary.join_mam)}>
                <MenuSubsectionLink title={dictionary.support} href="/join" />
                <MenuSubsectionLink title={dictionary.create_brick} href="/join#create-brick" />
              </MenuSectionWrapper>
              <MenuSectionLink title={dictionary.become_member} href="/become-member" />
              <MenuSectionWrapper title={dictionary.transparency} {...getAccordionItemHandlers(dictionary.transparency)}>
                <MenuSubsectionLink title={dictionary.organigrama} href="/transparency#organigrama" />
                <MenuSubsectionLink title={dictionary.donde_va_tu_dinero} href="/transparency#donde_va_tu_dinero" />
                <MenuSubsectionLink title={dictionary.construyendo_puentes} href="/transparency#construyendo_puentes" />
                <MenuSubsectionLink title={dictionary.canal_denuncias} href="/transparency#canal_denuncias" />
              </MenuSectionWrapper>
            </Accordion.Root>

            <Dialog.Close
              className="relative grid h-6 w-6 cursor-pointer place-items-center rounded-full"
              aria-label={closeLabel}
            >
              <div className="absolute h-0.5 w-5 -rotate-45 transform bg-purple" />
              <div className="absolute h-0.5 w-5 rotate-45 transform bg-purple" />
            </Dialog.Close>
          </div>
        </Dialog.Content>

        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Menu;
