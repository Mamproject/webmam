import bottlesBuildingPic from "@/assets/bottles_building.jpg";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SubscribeForm from "./components/subscribe-form";

export default function KeepConnected() {
  const t = useTranslations();

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple">
          {t("subscribe.connection_time")}
        </Heading>

        <p className="mb-4 md:mb-8">{t("subscribe.subscribe_text")}</p>

        <div className="flex flex-col gap-8 py-4 md:flex-row-reverse md:items-center 2xl:mx-auto 2xl:max-w-(--breakpoint-xl) 2xl:gap-8">
          <div className="md:w-1/2">
            <Image
              alt={t("images.bottles_building_alt")}
              src={bottlesBuildingPic}
              className="h-[300px] w-full object-cover lg:h-[400px]"
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <SubscribeForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
