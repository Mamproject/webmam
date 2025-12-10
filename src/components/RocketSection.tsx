import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { FC } from "react";

interface RocketSectionProps {
  src: StaticImageData | string;
  title: string;
  description: string;
}

const RocketSection: FC<RocketSectionProps> = ({ src, title, description }) => {
  return (
    <div className="flex max-w-md flex-col items-center gap-8 md:w-64">
      <div className="group relative h-64 w-64 overflow-hidden rounded-full">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover"
          placeholder="blur"
          sizes="(min-width: 425) 60vw, (min-width: 425) 60vw, 100vw"
        />
        <div className="bg-purple absolute inset-0 z-10 flex items-center justify-center p-10 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
          {title}
        </div>
      </div>

      <p>{description}</p>
    </div>
  );
};

export default RocketSection;
