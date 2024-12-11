import type { MemberCardProps } from "@/components/MemberCard";
import picPlaceholder from "@/assets/pic_placeholder.png";
import picMarta from "@/assets/MartaSillaRodas.JPG"; 
import type { Dictionary } from "@/i18n/dictionaries/es";


export const members = (dictionary: Dictionary): MemberCardProps[] => [
  {
    name: "Marta Falguera",
    title: dictionary.president,
    pictureSrc: picMarta,
  },
  {
    name: "Ángela Suárez",
    title: dictionary.secretary,
    pictureSrc: picPlaceholder,
  },
  {
    name: "Miguel Sánchez",
    title: dictionary.treasurer,
    pictureSrc: picPlaceholder,
  },
];
