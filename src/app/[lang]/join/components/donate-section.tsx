"use client";

import childrenAroundCakeImg from "@/assets/children_around_cake.jpg";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { FC } from "react";
import { useState } from "react";
import type { ParsedJoinSearchParams } from "../utils/parse-join-page-params";
import type { TDonateSectionView } from "../utils/view-schema";
import DonateForm from "./donate-form";

const DonateSection: FC<ParsedJoinSearchParams> = ({ initialView = "initial", initialFormValues }) => {
  const t = useTranslations();
  const [view, setView] = useState<TDonateSectionView>(initialView);

  const renderView = () => {
    switch (view) {
      case "form":
        return <DonateForm initialFormValues={initialFormValues} />;
      case "success":
        return <p>{t("donate.payment_thanks")}</p>;
      default:
        return (
          <>
            <p className="flex flex-col gap-4 text-base md:text-lg">{t("donate.donate_description")}</p>
            <Button color="purple" className="w-fit" onClick={() => setView("form")}>
              {t("common.support")}
            </Button>
          </>
        );
    }
  };

  return (
    <article className="flex flex-col items-center gap-6 md:flex-row">
      <div className="relative h-48 w-full md:h-80 md:flex-1">
        <Image
          src={childrenAroundCakeImg}
          alt={t("images.children_around_cake_alt")}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          placeholder="blur"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-xl uppercase md:text-2xl">{t("donate.donate_your_brick")}</h2>
        {renderView()}
      </div>
    </article>
  );
};

export default DonateSection;
