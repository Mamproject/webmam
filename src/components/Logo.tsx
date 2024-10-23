import type { ColorVariant } from "@/types/theme";
import type { FC } from "react";
import Image from "next/image";
import mamPink from "@/assets/mam_pink.png";
import mamWhite from "@/assets/mam_white.png";

interface LogoProps {
  variant: ColorVariant;
}

const Logo: FC<LogoProps> = ({ variant }) => <Image src={srcs[variant]} alt="MAM Logo" height={80} width={268} />;

const srcs = {
  purple: mamPink,
  white: mamWhite,
};

export default Logo;
