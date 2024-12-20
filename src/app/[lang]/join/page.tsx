import MamMerchImg from "@/assets/mam_merch.png";
import SpainAfricaImg from "@/assets/spain_africa.png";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/i18n-config";
import Image from "next/image";
import CreateBrickSections from "./components/create-brick-sections";
import type { JoinSearchParams } from "./utils/parse-join-page-params";
import { parseJoinSearchParams } from "./utils/parse-join-page-params";

export default async function Join({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: JoinSearchParams;
}) {
  const dictionary = await getDictionary(lang);
  const parsedSearchParams = parseJoinSearchParams(searchParams);

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {dictionary.join_mam}
        </Heading>
      </Container>
      <Container horizontal className="mb-8 md:mb-16">
        {/* Sección para redirigir a GoFundMe */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            {dictionary.donation_title || "Haz tu Donación"}
          </h2>
          <p className="text-gray-700 mb-6">
            {dictionary.donation_description || "Gracias por apoyar nuestra causa. Haz clic en el botón para ir a nuestra página de GoFundMe, donde podrás elegir la cantidad de tu aportación."}
          </p>
          <a
            href="https://gofund.me/8bdad21b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            {dictionary.donation_button || "Ir a GoFundMe"}
          </a>
        </div>
      </Container>

      <Container id="create-brick" horizontal className="flex flex-col gap-8">
        <Heading level={1} color="purple" className="text-center">
          {dictionary.solidarity_brick}
        </Heading>
        <p className="mb-4 md:mb-8">{dictionary.create_brick_description}</p>
        <div className="relative z-0 grid grid-cols-1 gap-x-8 gap-y-24 text-sm md:grid-cols-2">
          <div className="absolute -z-10 h-full w-full">
            <div className="relative h-1/2 w-full">
              <Image
                src={SpainAfricaImg}
                fill
                className="object-contain opacity-20"
                alt={dictionary.spain_africa_pic}
                sizes="(min-width: 3840) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
            <div className="relative h-1/2 w-full opacity-50">
              <Image
                src={MamMerchImg}
                fill
                className="object-contain"
                alt={dictionary.mam_merch_pic}
                sizes="(min-width: 3840) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
          </div>
          <CreateBrickSections dictionary={dictionary} />
        </div>
      </Container>
    </main>
  );
}
