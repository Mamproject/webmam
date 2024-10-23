import type { LocalizedString } from "@/i18n/localized-string";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";

interface PictureCardProps {
  src: StaticImageData;
  title: LocalizedString;
}

const PictureCard: FC<PictureCardProps> = ({ src, title }) => {
  return (
    <div className="flex flex-col gap-8 w-64">
      <div className="relative w-64 h-64">
        <Image src={src} alt={title} fill className="object-contain" />
      </div>

      <p className="text-center text-lg">{title.toUpperCase()}</p>
    </div>
  );
};

export default PictureCard;
