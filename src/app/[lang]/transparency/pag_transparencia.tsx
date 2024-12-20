import { BigArticle, SmallArticle } from "@/components/Article";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/i18n-config";


export default async function About({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {dictionary.about_us}
        </Heading>
        <section className="mb-16 flex flex-col gap-16">
          <BigArticle
            title={dictionary.base}
            description={<p>{dictionary.base_1}</p>}
            pictureSrc={tableAndChairsImg}
            pictureAlt={dictionary.table_and_chairs_alt}
            imageAlign="left"
            priority
          />

          <BigArticle
            title={dictionary.first_brick}
            description={
              <>
                <p>{dictionary.first_brick_1}</p>
                <p>{dictionary.first_brick_2}</p>
                <p>{dictionary.first_brick_3}</p>
              </>
            }
            imageAlign="right"
            pictureSrc={kenyaRoadImg}
            pictureAlt={dictionary.kenya_road_alt}
          />

          <BigArticle
            title={dictionary.building_bridges}
            description={
              <>
                <p>{dictionary.building_bridges_1}</p>
                <p>{dictionary.building_bridges_2}</p>
              </>
            }
            pictureSrc={marketImg}
            pictureAlt={dictionary.market_alt}
            imageAlign="left"
          />

          <div className="flex flex-col gap-10 md:flex-row">
            <SmallArticle
              title={dictionary.scope}
              description={<p>{dictionary.scope_1}</p>}
              pictureSrc={studentsImg}
              pictureAlt={dictionary.students_alt}
            />

            <SmallArticle
              title={dictionary.vision}
              description={dictionary.vision_text}
              pictureSrc={wheelChairsImg}
              pictureAlt={dictionary.wheel_chairs_alt}
            />
          </div>
        </section>

        <section id="bridge_people">
          <Heading level={1} color="purple" className="mb-16">
            {dictionary.bridge_people}
          </Heading>

          <div className="flex flex-wrap items-center justify-evenly gap-8">
            {members(dictionary).map((member) => (
              <MemberCard {...member} key={member.name} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
