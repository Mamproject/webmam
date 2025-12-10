import type { FC } from "react";
import Image from "next/image";
import type { SocialMediaType } from "@/settings/socialMedia";
import { socialMediaData } from "@/settings/socialMedia";
import { useTranslations } from "next-intl";

export interface SocialMediaButtonProps {
  variant: SocialMediaType;
}

const SocialMediaButton: FC<SocialMediaButtonProps> = ({ variant }) => {
  const t = useTranslations();
  const name = variant;
  const buttonAccessibilityLabel = t("accessibility.open_new_tab", { name });

  return (
    <a
      href={socialMediaData[variant].url}
      target="_blank"
      className="grid h-8 w-8 place-items-center rounded-full hover:scale-105 hover:drop-shadow-lg"
      aria-label={buttonAccessibilityLabel}
      title={buttonAccessibilityLabel}
    >
      <Image src={socialMediaData[variant].logo} alt={t("accessibility.logo", { name })} />
    </a>
  );
};

export default SocialMediaButton;
