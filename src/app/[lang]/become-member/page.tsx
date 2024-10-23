import bottlesBuildingPic from "@/assets/bottles_building.jpg";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/i18n-config";
import Image from "next/image";
import SubscribeForm from "./components/subscribe-form";

export default async function KeepConnected({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple">
          {dictionary.connection_time}
        </Heading>

        <p className="mb-4 md:mb-8">{dictionary.subscribe_text}</p>

        <div
          className="flex flex-col gap-8 py-4 md:flex-row-reverse md:items-center 2xl:mx-auto
          2xl:max-w-screen-xl 2xl:gap-8"
        >
          <div className="md:w-1/2">
            <Image
              alt={dictionary.bottles_building_alt}
              src={bottlesBuildingPic}
              className="h-[300px] w-full object-cover lg:h-[400px]"
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <SubscribeForm dictionary={dictionary} />
          </div>
        </div>
      </Container>
    </main>
  );
}
