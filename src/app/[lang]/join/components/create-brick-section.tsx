"use client";

import BrickBtn from "@/components/BrickBtn";
import type { FC } from "react";

interface CreateBrickSectionProps {
  title: string;
  description: string;
  onOpenForm: VoidFunction;
}

const CreateBrickSection: FC<CreateBrickSectionProps> = ({ title, description, onOpenForm }) => {
  return (
    <article className="flex flex-col items-center gap-12">
      <BrickBtn onClick={onOpenForm}>{title}</BrickBtn>
      <p className="max-w-[70vw] md:max-w-[20vw]">{description}</p>
    </article>
  );
};

export default CreateBrickSection;
