import type { FC } from "react";
import Image from "next/image";
import type { SocialMediaType} from "@/settings/socialMedia";
import { socialMediaData } from "@/settings/socialMedia";
import type { Dictionary } from "@/i18n/dictionaries/es";

export interface SocialMediaButtonProps {
  variant: SocialMediaType;
  dictionary: Dictionary;
}

const SocialMediaButton: FC<SocialMediaButtonProps> = ({ variant, dictionary }) => {
  const name = variant;
  const buttonAccessibilityLabel = dictionary.open_new_tab.replace("{name}", name);

  return (
    <a
      href={socialMediaData[variant].url}
      target="_blank"
      className="grid h-8 w-8 place-items-center rounded-full hover:scale-105 hover:drop-shadow-lg"
      aria-label={buttonAccessibilityLabel}
      title={buttonAccessibilityLabel}
    >
      <Image src={socialMediaData[variant].logo} alt={dictionary.logo.replace("{name}", name)} />
    </a>
  );
};

export default SocialMediaButton;
