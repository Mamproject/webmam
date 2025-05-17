import brick from "@/assets/brick.png";
import type { LocalizedString } from "@/i18n/localized-string";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

interface MenuSectionBaseProps {
  title: LocalizedString;
}

interface MenuSectionLinkProps extends MenuSectionBaseProps {
  href: string;
}

interface MenuSectionWrapperProps extends PropsWithChildren<MenuSectionBaseProps> {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick: () => void;
}

interface MenuSectionButtonProps extends MenuSectionBaseProps {
  onClick: () => void;
}

const MenuSectionBase: FC<MenuSectionBaseProps> = ({ title }) => (
  <span className="flex items-center gap-3">
    <span className="w-8 shrink-0 md:w-10">
      <Image src={brick} alt="MAM Logo" className="pt-1" />
    </span>
    <span className="text-purple grow text-left text-2xl leading-normal">{title}</span>
  </span>
);

const MenuSectionLink: FC<MenuSectionLinkProps> = ({ href, title }) => (
  <Dialog.Close asChild>
    <Link href={href} className="focus:outline-none">
      <MenuSectionBase title={title} />
    </Link>
  </Dialog.Close>
);

const MenuSectionButton: FC<MenuSectionButtonProps> = ({ onClick, title }) => (
  <Dialog.Close asChild>
    <button className="focus:outline-none" onClick={onClick}>
      <MenuSectionBase title={title} />
    </button>
  </Dialog.Close>
);

const MenuSectionWrapper: FC<MenuSectionWrapperProps> = ({ title, children, onMouseEnter, onMouseLeave, onClick }) => (
  <Accordion.Item value={title} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <Accordion.Trigger
      className="group flex w-full cursor-pointer items-center gap-3 focus:outline-none"
      onClick={onClick}
    >
      <MenuSectionBase title={title} />
      <ChevronRightIcon className="text-purple h-5 w-5 shrink-0 transition-all group-data-[state=open]:rotate-90" />
    </Accordion.Trigger>
    <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden py-1">
      <div className="mt-1 ml-14 flex flex-col md:ml-16">{children}</div>
    </Accordion.Content>
  </Accordion.Item>
);

const MenuSubsectionButton: FC<MenuSectionButtonProps> = ({ onClick, title }) => (
  <Dialog.Close asChild>
    <button onClick={onClick} className="text-purple w-fit focus:outline-none md:text-lg">
      {title}
    </button>
  </Dialog.Close>
);

const MenuSubsectionLink: FC<MenuSectionLinkProps> = ({ href, title }) => (
  <Dialog.Close asChild>
    <Link href={href} className="text-purple w-fit md:text-lg">
      {title}
    </Link>
  </Dialog.Close>
);

export { MenuSectionLink, MenuSectionButton, MenuSectionWrapper, MenuSubsectionButton, MenuSubsectionLink };
