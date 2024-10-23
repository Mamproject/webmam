"use client";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { LocalizedString } from "@/i18n/localized-string";
import { ColorVariant, oppositeVariant } from "@/types/theme";
import { cx } from "class-variance-authority";
import Link from "next/link";
import type { FC} from "react";
import { useState } from "react";
import Button from "./Button";
import Container from "./Container";
import Hamburger from "./Hamburger";
import Logo from "./Logo";
import Menu from "./Menu";

export interface NavbarProps {
  dictionary: Dictionary;
  variant: ColorVariant;
  labels: {
    support: LocalizedString;
    close: LocalizedString;
  };
}

const Navbar: FC<NavbarProps> = ({ variant, dictionary, labels }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleHamburgerClick = () => setMenuIsOpen((prev) => !prev);

  const contrastVariant = oppositeVariant(variant);

  return (
    <>
      <Menu open={menuIsOpen} onClose={handleHamburgerClick} dictionary={dictionary} closeLabel={labels.close} />
      <nav className={cx(styleSettings[variant].background, "relative z-10 shadow-md")}>
        <Container horizontal className="flex h-16 items-center justify-between md:h-[4.5rem]">
          <Hamburger variant={contrastVariant} onClick={handleHamburgerClick} />
          <div className="w-32 md:w-40">
            <Link href="/">
              <Logo variant={contrastVariant} />
            </Link>
          </div>
          <Button disabled color={contrastVariant} asChild>
            <Link href="/join">{labels.support}</Link>
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
