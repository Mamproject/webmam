import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";

export interface MemberCardProps {
  name: string;
  title: string;
  pictureSrc: StaticImageData;
}

const MemberCard: FC<MemberCardProps> = ({ name, title, pictureSrc }) => (
  <article className="flex flex-col items-center gap-2">
    <div className="bg-purple relative h-48 w-48 overflow-hidden rounded-full md:h-64 md:w-64">
      <Image src={pictureSrc} alt={name} fill className="object-cover object-center" />
    </div>

    <h3 className="text-lg uppercase md:text-xl">{name}</h3>

    <p>{title}</p>
  </article>
);

export default MemberCard;
