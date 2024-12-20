import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/i18n-config";

export default async function Transparency({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="py-8">
      <Container horizontal>
        <Heading level={1} color="purple" className="text-center">
          {dictionary.transparency}
        </Heading>
        <p className="text-center text-lg text-gray-700 mt-4">
          {dictionary.transparency_explain}
        </p>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.organigrama}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.donde_va_tu_dinero}
          </p>
          {/* Aquí puedes agregar más detalles sobre los proyectos financiados */}
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.donde_va_tu_dinero}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.donde_va_tu_dinero}
          </p>
          {/* Aquí puedes agregar más detalles sobre los proyectos financiados */}
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.construyendo_puentes}
           </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.donde_va_tu_dinero}
          </p>
          {/* Aquí puedes agregar más detalles sobre los proyectos financiados */}
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.canal_denuncias}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.text_canal_denuncias}
          </p>
          {/* Aquí puedes agregar un listado de proyectos o imágenes de los mismos */}
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.contact}
          </p>
          <a
            href="/contacto"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            {dictionary.text_canal_denuncias}
          </a>
        </section>
      </Container>
    </main>
  );
}
