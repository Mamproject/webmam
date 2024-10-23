"use client";

import type { FC} from "react";
import { useState } from "react";
import CreateBrickSection from "./create-brick-section";
import CreateBrickModal from "./create-brick-modal";
import type { Dictionary } from "@/i18n/dictionaries/es";

interface CreateBrickSectionsProps {
  dictionary: Dictionary;
}

const CreateBrickSections: FC<CreateBrickSectionsProps> = ({ dictionary }) => {
  const [open, setOpen] = useState(false);
  const [sectionClicked, setSectionClicked] = useState("");

  const handleOpenForm = (sectionClicked: string) => () => {
    setOpen(true);
    setSectionClicked(sectionClicked);
  };

  const sections = [
    {
      sectionClicked: "concierto solidario",
      title: dictionary.solidarity_concert,
      description: dictionary.solidarity_concert_description,
    },
    {
      sectionClicked: "comida benéfica",
      title: dictionary.solidarity_meal,
      description: dictionary.solidarity_meal_description,
    },
    {
      sectionClicked: "celebración",
      title: dictionary.celebrations,
      description: dictionary.celebrations_description,
    },
    {
      sectionClicked: "evento deportivo o cultural",
      title: dictionary.sport_cultural_event,
      description: dictionary.sport_cultural_event_description,
    },
    {
      sectionClicked: "reto solidario",
      title: dictionary.solidarity_challenge,
      description: dictionary.solidarity_challenge_description,
    },
    {
      sectionClicked: "nos propones una idea",
      title: dictionary.tell_us,
      description: dictionary.tell_us_description,
    },
  ];

  return (
    <>
      {sections.map(({ sectionClicked, ...section }) => (
        <CreateBrickSection key={section.title} onOpenForm={handleOpenForm(sectionClicked)} {...section} />
      ))}

      <CreateBrickModal open={open} onOpenChange={setOpen} dictionary={dictionary} sectionClicked={sectionClicked} />
    </>
  );
};

export default CreateBrickSections;
