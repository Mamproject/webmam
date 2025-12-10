import kenyaRoadImg from "@/assets/kenya_road.jpg";
import marketImg from "@/assets/market.jpg";
import studentsImg from "@/assets/students.jpg";
import tableAndChairsImg from "@/assets/table_and_chairs.jpg";
import wheelChairsImg from "@/assets/wheel_chairs.jpg";
import { BigArticle, SmallArticle } from "@/components/Article";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import MemberCard from "@/components/MemberCard";
import { members } from "@/settings/members";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {t("navigation.about_us")}
        </Heading>
        <section className="mb-16 flex flex-col gap-16">
          <BigArticle
            title={t("about.base")}
            description={<p>{t("about.base_1")}</p>}
            pictureSrc={tableAndChairsImg}
            pictureAlt={t("images.table_and_chairs_alt")}
            imageAlign="left"
            priority
          />

          <BigArticle
            title={t("about.first_brick")}
            description={
              <>
                <p>{t("about.first_brick_1")}</p>
                <p>{t("about.first_brick_2")}</p>
                <p>{t("about.first_brick_3")}</p>
              </>
            }
            imageAlign="right"
            pictureSrc={kenyaRoadImg}
            pictureAlt={t("images.kenya_road_alt")}
          />

          <BigArticle
            title={t("home.building_bridges")}
            description={
              <>
                <p>{t("about.building_bridges_1")}</p>
                <p>{t("about.building_bridges_2")}</p>
              </>
            }
            pictureSrc={marketImg}
            pictureAlt={t("images.market_alt")}
            imageAlign="left"
          />

          <div className="flex flex-col gap-10 md:flex-row">
            <SmallArticle
              title={t("about.scope")}
              description={<p>{t("about.scope_1")}</p>}
              pictureSrc={studentsImg}
              pictureAlt={t("images.students_alt")}
            />

            <SmallArticle
              title={t("about.vision")}
              description={t("about.vision_text")}
              pictureSrc={wheelChairsImg}
              pictureAlt={t("images.wheel_chairs_alt")}
            />
          </div>
        </section>

        <section id="bridge_people">
          <Heading level={1} color="purple" className="mb-16 text-center">
            {t("navigation.bridge_people")}
          </Heading>

          <div className="flex flex-wrap items-center justify-evenly gap-8">
            {members(t).map((member) => (
              <MemberCard {...member} key={member.name} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
