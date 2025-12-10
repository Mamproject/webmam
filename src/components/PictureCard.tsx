import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";

interface PictureCardProps {
  src: StaticImageData;
  title: string;
}

const PictureCard: FC<PictureCardProps> = ({ src, title }) => {
  return (
    <div className="flex w-64 flex-col gap-8">
      <div className="relative h-64 w-64">
        <Image src={src} alt={title} fill className="object-contain" />
      </div>

      <p className="text-center text-lg">{title.toUpperCase()}</p>
    </div>
  );
};

export default PictureCard;
