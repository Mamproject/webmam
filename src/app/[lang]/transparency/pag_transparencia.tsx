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
          {dictionary.transparency_title || "Nuestro Compromiso con la Transparencia"}
        </Heading>
        <p className="text-center text-lg text-gray-700 mt-4">
          {dictionary.transparency_intro || "En nuestra ONG, creemos que la transparencia es clave para generar confianza y asegurar que cada donación sea utilizada de la manera más eficiente posible."}
        </p>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.how_donations_are_used || "¿Cómo utilizamos tus donaciones?"}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.donations_description || "Las donaciones que recibimos son destinadas directamente a proyectos de impacto social, asegurando siempre el máximo beneficio para las comunidades que apoyamos."}
          </p>
          {/* Aquí puedes agregar más detalles sobre los proyectos financiados */}
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.financial_reports || "Informes Financieros"}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.financial_reports_description || "Puedes consultar nuestros informes anuales y de auditoría para conocer cómo gestionamos los fondos de manera transparente."}
          </p>
          <a
            href="/informe-anual.pdf" // Aquí puedes colocar el enlace a tus informes
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            {dictionary.view_report || "Ver informe completo"}
          </a>
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.projects_funded || "Proyectos Financiados"}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.projects_description || "Aquí puedes conocer algunos de los proyectos que hemos financiado gracias a tu apoyo."}
          </p>
          {/* Aquí puedes agregar un listado de proyectos o imágenes de los mismos */}
        </section>
      </Container>

      <Container horizontal className="mt-8">
        <section className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            {dictionary.contact_us || "Si tienes alguna pregunta o quieres saber más, no dudes en contactarnos."}
          </p>
          <a
            href="/contacto"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
          >
            {dictionary.contact_button || "Contacta con nosotros"}
          </a>
        </section>
      </Container>
    </main>
  );
}
