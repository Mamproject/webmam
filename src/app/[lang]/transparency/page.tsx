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
        <p className="text-lg text-gray-700 mt-4">
          {dictionary.transparency_explain}
        </p>
      </Container>

      <Container id="organigrama" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.organigrama}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary. en_construccion}
          </p>
          <iframe 
      src="@/assets/Resolucion inscricion Asoc MAM PROJECT.pdf"
      width="100%" 
      height="600px" 
      frameBorder="0"
      /> 
        </section>
      </Container>

      <Container id="donde_va_tu_dinero" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.donde_va_tu_dinero}
          </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary. en_construccion}
          </p>
          {/* Aquí puedes agregar más detalles sobre los proyectos financiados */}
        </section>
      </Container>

      <Container id="construyendo_puentes" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.construyendo_puentes}
           </Heading>
          <p className="text-lg text-gray-700 mb-6">
            {dictionary. en_construccion}
          </p>
          {/* Aquí puedes agregar más detalles sobre los proyectos financiados */}
        </section>
      </Container>

     <Container id="canal_denuncias" horizontal className="mt-8">
        <section>
          <Heading level={2} color="purple" className="text-center mb-4">
            {dictionary.canal_denuncias}
          </Heading>
        <a href="mailto: mamprojectukunda@gmail.com"  
        className="inline-block bg-purple text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple transition" >
        {dictionary.text_canal_denuncias}
       </a>
      </section>
</Container>
    </main>
  );
}
