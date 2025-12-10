"use client";
import { ColorVariant, oppositeVariant } from "@/types/theme";
import { cx } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import Button from "./Button";
import Container from "./Container";
import Hamburger from "./Hamburger";
import Logo from "./Logo";
import Menu from "./Menu";

export interface NavbarProps {
  variant: ColorVariant;
}

const Navbar: FC<NavbarProps> = ({ variant }) => {
  const t = useTranslations();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleHamburgerClick = () => setMenuIsOpen((prev) => !prev);

  const contrastVariant = oppositeVariant(variant);

  return (
    <>
      <Menu open={menuIsOpen} onClose={handleHamburgerClick} />
      <nav className={cx(styleSettings[variant].background, "relative z-10 shadow-md")}>
        <Container horizontal className="flex h-16 items-center justify-between md:h-18">
          <Hamburger variant={contrastVariant} onClick={handleHamburgerClick} />
          <div className="w-32 md:w-40">
            <Link href="/">
              <Logo variant={contrastVariant} />
            </Link>
          </div>
          <Button disabled color={contrastVariant} asChild>
            <Link href="/join">{t("common.support")}</Link>
          </Button>
        </Container>
      </nav>
    </>
  );
};

const styleSettings = {
  [ColorVariant.Purple]: {
    background: "bg-purple",
  },
  [ColorVariant.White]: {
    background: "bg-white",
  },
};

export default Navbar;
