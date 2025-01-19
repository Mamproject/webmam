import type { MemberCardProps } from "@/components/MemberCard";
import picPlaceholder from "@/assets/pic_placeholder.png";
import picMarta from "@/assets/marta_falguera.jpg";
import picLua from "@/assets/Lua_santamaria.jpg";
import picSara from "@/assets/sara_demiguel.jpg";
import picMiguel from "@/assets/miguel_sanchez.jpg";
import picAngela  from "@/assets/anglea_suarez.jpg"
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
    pictureSrc: picAngela,
  },
  {
    name: "Miguel Sánchez",
    title: dictionary.treasurer,
    pictureSrc: picMiguel,
  },
  {
    name: "Sara de Miguel",
    title: dictionary.gestionproyecto,
    pictureSrc: picSara,
  },
  {
    name: "Lua Santamaría",
    title: dictionary.redessociais,
    pictureSrc: picLua,
  },
];
