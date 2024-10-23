"use client";

import { usePathname } from "next/navigation";
import type { FC } from "react";
import type { NavbarProps } from "./Navbar";
import Navbar from "./Navbar";
import { ColorVariant } from "@/types/theme";
import type { Locale } from "@/i18n/i18n-config";
import type { Dictionary } from "@/i18n/dictionaries/es";

interface NavbarWrapperProps extends Omit<NavbarProps, "variant" | "sections"> {
  lang: Locale;
  dictionary: Dictionary;
}

const NavbarWrapper: FC<NavbarWrapperProps> = ({ lang, dictionary, ...props }) => {
  const pathname = usePathname();
  const variant = pathname === `/${lang}` ? ColorVariant.White : ColorVariant.Purple;

  return <Navbar variant={variant} dictionary={dictionary} {...props} />;
};

export default NavbarWrapper;
