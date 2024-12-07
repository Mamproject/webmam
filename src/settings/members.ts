import type { MemberCardProps } from "@/components/MemberCard";
import picPlaceholder from "@/assets/pic_placeholder.png";
import type { Dictionary } from "@/i18n/dictionaries/es";

export const members = (dictionary: Dictionary): MemberCardProps[] => [
  {
    name: "Marta Falguera",
    title: dictionary.president,
    pictureSrc: picPlaceholder,
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
  {
    name: "Abdul Maqbul",
    title: dictionary.kenya_manager,
    pictureSrc: picPlaceholder,
  },
  {
    name: "Leah Wambu",
    title: dictionary.kenya_manager,
    pictureSrc: picPlaceholder,
  },
  {
    name: "Mama Gladys",
    title: dictionary.kenya_manager,
    pictureSrc: picPlaceholder,
  },
  {
    name: "Daniel Mateos",
    title: dictionary.web_development,
    pictureSrc: picPlaceholder,
  },
];
