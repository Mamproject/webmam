import type { MemberCardProps } from "@/components/MemberCard";
import picMarta from "@/assets/marta_falguera.jpg";
import picLua from "@/assets/Lua_santamaria.jpg";
import picSara from "@/assets/sara_demiguel.jpg";
import picMiguel from "@/assets/miguel_sanchez.jpg";
import picAngela from "@/assets/angela_suarez.jpg";
import type { TranslatorFunction } from "@/types/utility-types";

export const members = (t: TranslatorFunction): MemberCardProps[] => [
  {
    name: "Marta Falguera",
    title: t("team.president"),
    pictureSrc: picMarta,
  },
  {
    name: "Ángela Suárez",
    title: t("team.secretary"),
    pictureSrc: picAngela,
  },
  {
    name: "Miguel Sánchez",
    title: t("team.treasurer"),
    pictureSrc: picMiguel,
  },
  {
    name: "Sara de Miguel",
    title: t("team.gestionproyecto"),
    pictureSrc: picSara,
  },
  {
    name: "Lua Santamaría",
    title: t("team.redessociais"),
    pictureSrc: picLua,
  },
];
