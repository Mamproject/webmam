"use client";

import type { FC } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CreateBrickSection from "./create-brick-section";
import CreateBrickModal from "./create-brick-modal";

const CreateBrickSections: FC = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [sectionClicked, setSectionClicked] = useState("");

  const handleOpenForm = (sectionClicked: string) => () => {
    setOpen(true);
    setSectionClicked(sectionClicked);
  };

  const sections = [
    {
      sectionClicked: "concierto solidario",
      title: t("createBrick.solidarity_concert"),
      description: t("createBrick.solidarity_concert_description"),
    },
    {
      sectionClicked: "comida benéfica",
      title: t("createBrick.solidarity_meal"),
      description: t("createBrick.solidarity_meal_description"),
    },
    {
      sectionClicked: "celebración",
      title: t("createBrick.celebrations"),
      description: t("createBrick.celebrations_description"),
    },
    {
      sectionClicked: "evento deportivo o cultural",
      title: t("createBrick.sport_cultural_event"),
      description: t("createBrick.sport_cultural_event_description"),
    },
    {
      sectionClicked: "reto solidario",
      title: t("createBrick.solidarity_challenge"),
      description: t("createBrick.solidarity_challenge_description"),
    },
    {
      sectionClicked: "nos propones una idea",
      title: t("createBrick.tell_us"),
      description: t("createBrick.tell_us_description"),
    },
  ];

  return (
    <>
      {sections.map(({ sectionClicked, ...section }) => (
        <CreateBrickSection key={section.title} onOpenForm={handleOpenForm(sectionClicked)} {...section} />
      ))}

      <CreateBrickModal open={open} onOpenChange={setOpen} sectionClicked={sectionClicked} />
    </>
  );
};

export default CreateBrickSections;
