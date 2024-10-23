import bridgesEn from "@/assets/bridges_en.svg";
import bridgesEs from "@/assets/bridges_es.svg";
import kenyaHomeImg from "@/assets/kenya_home.jpg";
import wheelchairKidsImg from "@/assets/wheelchair_kids.jpg";
import { BigArticle } from "@/components/Article";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/i18n-config";
import Image from "next/image";
import Link from "next/link";

const bridges = {
  en: bridgesEn,
  es: bridgesEs,
};

export default async function PurpleBricks({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {dictionary.violet_bricks}
        </Heading>
        <div className="mb-16 flex flex-col gap-16">
          <BigArticle
            title={dictionary.build_a_home}
            description={dictionary.violet_bricks_description}
            pictureSrc={kenyaHomeImg}
            pictureAlt={dictionary.kenya_home_alt}
            imageAlign="left"
            priority
          />
          <BigArticle
            title={dictionary.bridge_people}
            description={dictionary.bridge_partners_description}
            pictureSrc={wheelchairKidsImg}
            pictureAlt={dictionary.wheelchair_kids_alt}
            imageAlign="right"
            priority
          />
        </div>

        <Heading level={1} color="purple" className="!mb-0 text-center">
          {dictionary.what_we_do}
        </Heading>
      </Container>

      <Image alt={dictionary.what_we_do} src={bridges[lang]} className="-my-4 mx-auto" />

      <div className="my-16 bg-purple p-8">
        <Heading level={2} color="white" className="!m-0 text-center uppercase">
          {dictionary.brick_value}
        </Heading>
      </div>

      <Container horizontal className="flex flex-col gap-16">
        <article>
          <Heading level={2} color="purple">
            {dictionary.what_is_a_violet_brick_question}
          </Heading>

          <p className="mb-4">{dictionary.what_is_a_violet_brick_answer}</p>

          <Button color="purple" variant="primary" className="mx-auto block w-fit px-4" asChild>
            <Link href="/join">{dictionary.support}</Link>
          </Button>
        </article>
      </Container>
    </main>
  );
}
