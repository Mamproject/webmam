import bridgesEn from "@/assets/bridges_en.svg";
import bridgesEs from "@/assets/bridges_es.svg";
import kenyaHomeImg from "@/assets/kenya_home.jpg";
import wheelchairKidsImg from "@/assets/wheelchair_kids.jpg";
import { BigArticle } from "@/components/Article";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const bridges = {
  en: bridgesEn,
  es: bridgesEs,
};

export default function PurpleBricks() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {t("navigation.violet_bricks")}
        </Heading>
        <div className="mb-16 flex flex-col gap-16">
          <BigArticle
            title={t("about.build_a_home")}
            description={t("violetBricks.violet_bricks_description")}
            pictureSrc={kenyaHomeImg}
            pictureAlt={t("images.kenya_home_alt")}
            imageAlign="left"
            priority
          />
          <BigArticle
            title={t("navigation.bridge_people")}
            description={t("violetBricks.bridge_partners_description")}
            pictureSrc={wheelchairKidsImg}
            pictureAlt={t("images.wheelchair_kids_alt")}
            imageAlign="right"
            priority
          />
        </div>

        <Heading level={1} color="purple" className="mb-0! text-center">
          {t("navigation.what_we_do")}
        </Heading>
      </Container>

      <Image alt={t("navigation.what_we_do")} src={bridges[locale as keyof typeof bridges]} className="mx-auto -my-4" />

      <div className="bg-purple my-16 p-8">
        <Heading level={2} color="white" className="m-0! text-center uppercase">
          {t("violetBricks.brick_value")}
        </Heading>
      </div>

      <Container horizontal className="flex flex-col gap-16">
        <article>
          <Heading level={2} color="purple">
            {t("violetBricks.what_is_a_violet_brick_question")}
          </Heading>

          <p className="mb-4">{t("violetBricks.what_is_a_violet_brick_answer")}</p>

          <Button color="purple" variant="primary" className="mx-auto block w-fit px-4" asChild>
            <Link href="/join">{t("common.support")}</Link>
          </Button>
        </article>
      </Container>
    </main>
  );
}
