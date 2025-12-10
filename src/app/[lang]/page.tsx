import educationPic from "@/assets/education.jpg";
import section1Pic from "@/assets/wheelchair_kids.jpg";
import momsSnc from "@/assets/moms_snc.png";
import spainAfricaPic from "@/assets/spain_africa.png";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import RocketSection from "@/components/RocketSection";
import { socialMediaData } from "@/settings/socialMedia";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import specialNeedsChildrenPic from "../../assets/special_needs_children.png";

export default async function Home() {
  const t = await getTranslations();

  return (
    <main>
      <article className="relative mx-auto mb-10 w-full max-w-[1920px] md:h-160 lg:h-128">
        <div className="relative h-[40vh] w-full md:h-full">
          <Image
            src={section1Pic}
            alt={t("home.gladys_with_children")}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 3840) 50vw, 100vw"
            placeholder="blur"
          />
        </div>

        <div className="bottom-0 left-0 w-full md:absolute">
          <div className="2xl:mx-auto 2xl:max-w-(--breakpoint-2xl)">
            <div className="bg-purple/90 w-full p-4 md:w-160">
              <Heading level={2} color="white" className="mb-4!">
                MAM PROJECT
              </Heading>

              <p className="font-montserrat mb-4 text-base text-white">{t("home.mam_description")}</p>

              <div className="flex gap-4">
                <Button className="w-fit" color="white" asChild>
                  <Link href="/join">{t("common.support")}</Link>
                </Button>

                <Button className="w-fit" color="white" asChild>
                  <a href="https://donate.stripe.com/28oaEGgwK9RMgs8eUV" target="_blank">
                    {t("navigation.become_member")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="mb-10">
        <Container horizontal>
          <Heading level={2} color="purple" className="text-center normal-case">
            {t("home.bridge_people_title")}
          </Heading>

          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1">
              <Image
                src={spainAfricaPic}
                alt={t("home.spain_africa_pic")}
                sizes="(min-width: 768px) 50vw, 100vw"
                placeholder="blur"
                priority
              />
            </div>

            <div className="flex-1">
              <p className="mb-4">{t("home.spain_africa_text_1")}</p>
              <p className="mb-4">{t("home.spain_africa_text_2")}</p>
              <p>{t("home.spain_africa_text_3")}</p>
            </div>
          </div>
        </Container>
      </article>

      <article className="mb-10">
        <Container horizontal>
          <Heading level={2} color="purple">
            {t("home.building_bridges")}...
          </Heading>

          <div className="mb-8 flex flex-col flex-wrap items-center gap-4 md:flex-row md:items-start md:justify-around md:gap-8 md:pl-8">
            <RocketSection
              src={specialNeedsChildrenPic}
              title={t("home.special_needs_children_pic")}
              description={t("home.rs_1")}
            />
            <RocketSection src={momsSnc} title={t("home.moms_snc_pic")} description={t("home.rs_2")} />
            <RocketSection src={educationPic} title={t("home.students")} description={t("home.rs_3")} />
          </div>

          <p>{t("home.bullets_footer")}</p>
        </Container>
      </article>

      <article className="bg-purple mb-10">
        <div className="mx-auto max-w-lg px-8 py-10">
          <Heading level={2} color="white" className="m-0! text-center uppercase">
            {t("about.build_a_home")}
          </Heading>
        </div>
      </article>

      <article className="mb-10 flex justify-center px-8">
        <a
          target="_blank"
          href={socialMediaData.instagram.url}
          className="text-purple text-center text-xl hover:underline"
        >
          {t("home.follow_instagram")}
          <ArrowTopRightOnSquareIcon className="ml-1 inline h-5 w-5" />
        </a>
      </article>
    </main>
  );
}
