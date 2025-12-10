"use client";

import { antonio } from "@/assets/fonts";
import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import type { FC } from "react";
import { useState } from "react";
import { MenuSectionLink, MenuSectionWrapper, MenuSubsectionLink } from "./MenuSection";

export interface MenuProps {
  open: boolean;
  onClose: () => void;
}

type AccordionTriggerType = "hover" | "native";
/** A record of item value, to trigger type  */
type AccordionState = Record<string, AccordionTriggerType>;

const Menu: FC<MenuProps> = ({ open, onClose }) => {
  const t = useTranslations();
  const [accordionState, setAccordionState] = useState<AccordionState>({});
  const accordionValues = Object.keys(accordionState);

  const getAccordionItemHandlers = (key: string) => ({
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
          className={`animate-slide-in-left data-[state=closed]:animate-slide-out-left fixed inset-y-0 z-50 overflow-y-auto bg-white p-4 md:p-6 ${antonio.className}`}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex justify-between gap-4">
            <Accordion.Root value={accordionValues} type="multiple" className="flex flex-col gap-3">
              <MenuSectionLink title={t("common.mam_project")} href="/" />
              <MenuSectionWrapper title={t("navigation.us")} {...getAccordionItemHandlers(t("navigation.us"))}>
                <MenuSubsectionLink title={t("navigation.about_us")} href="/about" />
                <MenuSubsectionLink title={t("navigation.bridge_people")} href="/about#bridge_people" />
              </MenuSectionWrapper>
              <MenuSectionLink title={t("navigation.violet_bricks")} href="/violet-bricks" />
              <MenuSectionWrapper
                title={t("navigation.join_mam")}
                {...getAccordionItemHandlers(t("navigation.join_mam"))}
              >
                <MenuSubsectionLink title={t("common.support")} href="/join" />
                <MenuSubsectionLink title={t("createBrick.create_brick")} href="/join#create-brick" />
              </MenuSectionWrapper>
              <MenuSectionLink title={t("navigation.become_member")} href="/become-member" />
              <MenuSectionWrapper
                title={t("navigation.transparency")}
                {...getAccordionItemHandlers(t("navigation.transparency"))}
              >
                <MenuSubsectionLink title={t("navigation.organigrama")} href="/transparency#organigrama" />
                <MenuSubsectionLink
                  title={t("navigation.donde_va_tu_dinero")}
                  href="/transparency#donde_va_tu_dinero"
                />
                <MenuSubsectionLink
                  title={t("navigation.construyendo_puentes")}
                  href="/transparency#construyendo_puentes"
                />
                <MenuSubsectionLink title={t("navigation.canal_denuncias")} href="/transparency#canal_denuncias" />
              </MenuSectionWrapper>
            </Accordion.Root>

            <Dialog.Close
              className="relative grid h-6 w-6 cursor-pointer place-items-center rounded-full"
              aria-label={t("common.close")}
            >
              <div className="bg-purple absolute h-0.5 w-5 -rotate-45 transform" />
              <div className="bg-purple absolute h-0.5 w-5 rotate-45 transform" />
            </Dialog.Close>
          </div>
        </Dialog.Content>

        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50 backdrop-blur-xs" />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Menu;
