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
  <article className="flex flex-col items-center gap-1">
    <div className="h-64 w-64 overflow-hidden rounded-full bg-purple">
      <Image src={pictureSrc} alt={name} width={256} height={256} className="object-cover" />
    </div>

    <h3 className="text-lg uppercase md:text-xl">{name}</h3>

    <p>{title}</p>
  </article>
);

export default MemberCard;
