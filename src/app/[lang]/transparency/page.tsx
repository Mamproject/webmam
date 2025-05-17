import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/i18n-config";

export default async function Transparency(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {dictionary.transparency}
        </Heading>
        <p className="mt-4 text-lg text-gray-700">{dictionary.transparency_explain}</p>
      </Container>

      <Container id="organigrama" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {dictionary.organigrama}
          </Heading>
          <p className="mb-6 text-lg text-gray-700">{dictionary.en_construccion}</p>
        </section>
      </Container>

      <Container id="donde_va_tu_dinero" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {dictionary.donde_va_tu_dinero}
          </Heading>
          <p className="mb-6 text-lg text-gray-700">{dictionary.en_construccion}</p>
        </section>
      </Container>

      <Container id="construyendo_puentes" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {dictionary.construyendo_puentes}
          </Heading>
          <p className="mb-6 text-lg text-gray-700">{dictionary.en_construccion}</p>
        </section>
      </Container>

      <Container id="canal_denuncias" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="mb-4 text-center">
            {dictionary.canal_denuncias}
          </Heading>
          <a
            href="mailto: mamprojectukunda@gmail.com"
            className="inline-block rounded-lg bg-purple px-6 py-3 text-lg font-semibold text-white transition hover:bg-purple"
          >
            {dictionary.text_canal_denuncias}
          </a>
        </section>
      </Container>
    </main>
  );
}
