"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import type { FC } from "react";
import Navbar from "./Navbar";
import { ColorVariant } from "@/types/theme";

const NavbarWrapper: FC = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const variant = pathname === `/${locale}` ? ColorVariant.White : ColorVariant.Purple;

  return <Navbar variant={variant} />;
};

export default NavbarWrapper;
