import type { LocalizedString } from "@/i18n/localized-string";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";

export interface MemberCardProps {
  name: string;
  title: LocalizedString;
  pictureSrc: StaticImageData;
}

const MemberCard: FC<MemberCardProps> = ({ name, title, pictureSrc }) => (
  <article className="flex flex-col items-center gap-2">
    <div className="h-48 w-48 md:h-64 md:w-64 overflow-hidden rounded-full bg-purple relative">
      <Image src={pictureSrc} alt={name} fill className="object-cover object-center" />
    </div>

    <h3 className="text-lg uppercase md:text-xl">{name}</h3>

    <p>{title}</p>
  </article>
);

export default MemberCard;
