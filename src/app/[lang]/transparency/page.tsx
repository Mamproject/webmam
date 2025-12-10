import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { useTranslations } from "next-intl";

export default function Transparency() {
  const t = useTranslations();

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {t("navigation.transparency")}
        </Heading>
        <p className="mt-4 text-lg text-gray-700">{t("transparency.transparency_explain")}</p>
      </Container>

      <Container id="organigrama" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {t("navigation.organigrama")}
          </Heading>
          <p className="mb-6 text-lg text-gray-700">{t("transparency.en_construccion")}</p>
        </section>
      </Container>

      <Container id="donde_va_tu_dinero" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {t("navigation.donde_va_tu_dinero")}
          </Heading>
          <p className="mb-6 text-lg text-gray-700">{t("transparency.en_construccion")}</p>
        </section>
      </Container>

      <Container id="construyendo_puentes" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {t("navigation.construyendo_puentes")}
          </Heading>
          <p className="mb-6 text-lg text-gray-700">{t("transparency.en_construccion")}</p>
        </section>
      </Container>

      <Container id="canal_denuncias" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {t("navigation.canal_denuncias")}
          </Heading>
          <a
            href="mailto: mamprojectukunda@gmail.com"
            className="bg-purple hover:bg-purple inline-block rounded-lg px-6 py-3 text-lg font-semibold text-white transition"
          >
            {t("transparency.text_canal_denuncias")}
          </a>
        </section>
      </Container>
    </main>
  );
}
