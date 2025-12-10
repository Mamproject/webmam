import MamMerchImg from "@/assets/mam_merch.png";
import SpainAfricaImg from "@/assets/spain_africa.png";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CreateBrickSections from "./components/create-brick-sections";

export default function Join() {
  const t = useTranslations();

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {t("navigation.join_mam")}
        </Heading>
      </Container>
      <Container horizontal className="mb-8 md:mb-16">
        {/* Sección para redirigir a GoFundMe */}
        <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 className="text-purple mb-4 text-2xl font-bold">{t("donate.donation_title")}</h2>
          <p className="mb-6 text-gray-700">{t("donate.donation_description")}</p>
          <a
            href="https://gofund.me/8bdad21b"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple inline-block rounded-lg px-6 py-3 text-lg font-semibold text-white transition hover:bg-purple-700"
          >
            {t("donate.donation_button")}
          </a>
        </div>
      </Container>

      <Container id="create-brick" horizontal className="flex flex-col gap-8">
        <Heading level={1} color="purple" className="text-center">
          {t("createBrick.solidarity_brick")}
        </Heading>
        <p className="mb-4 md:mb-8">{t("createBrick.create_brick_description")}</p>
        <div className="relative z-0 grid grid-cols-1 gap-x-8 gap-y-24 text-sm md:grid-cols-2">
          <div className="absolute -z-10 h-full w-full">
            <div className="relative h-1/2 w-full">
              <Image
                src={SpainAfricaImg}
                fill
                className="object-contain opacity-20"
                alt={t("home.spain_africa_pic")}
                sizes="(min-width: 3840) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
            <div className="relative h-1/2 w-full opacity-50">
              <Image
                src={MamMerchImg}
                fill
                className="object-contain"
                alt={t("createBrick.mam_merch_pic")}
                sizes="(min-width: 3840) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
          </div>
          <CreateBrickSections />
        </div>
      </Container>
    </main>
  );
}
