import type { TCommonForm, TForm, TFormKeys, TSentForm } from "@/utils/form-schemas";
import { pickAttributes } from "@/utils/pick-attributes";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  render,
} from "@react-email/components";
import type { FC } from "react";

interface Section {
  title: string;
  content: string | number;
}

interface EmailProps {
  subject: string;
  sections: Section[];
}

const Email: FC<EmailProps> = ({ subject, sections }) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              "purple-hex": "#d294ff",
            },
          },
        },
      }}
    >
      <Body className='bg-white font-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica_Neue",sans-serif]'>
        <Container className="mx-auto max-w-136 pt-6 pb-8">
          <Heading className="text-purple-hex text-2xl">{subject}</Heading>
          {sections.map(({ title, content }, i) => (
            <Section key={i}>
              <Heading as="h2" className="mb-2 text-base text-gray-700">
                {title}
              </Heading>
              <Text className="my-0 mb-4 text-base text-gray-700">{content}</Text>
            </Section>
          ))}
          <Hr className="my-4 text-gray-200" />
          <Text className="text-sm text-gray-500">Mam Project Ukunda</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const getEmailHtml = async (data: TSentForm & TForm[TFormKeys], subject: string) => {
  const sections = await getOrderedSections(data);
  return render(<Email subject={subject} sections={sections} />);
};

const getOrderedSections = async (data: TSentForm & TForm[TFormKeys]) => {
  // Emails are always sent in Spanish, regardless of user's locale
  const { formKey, ...rest } = data;
  const orderedSections: Section[] = [];
  orderedLabelKeys.forEach((labelKey) => {
    if (labelKey in rest) {
      const label = (formLabels[formKey] as Record<string, string>)[labelKey];
      const content = rest[labelKey as keyof typeof rest & typeof labelKey];
      orderedSections.push({ title: label, content: content.toString() });
    }
  });
  return orderedSections;
};

const orderedLabelKeys = ["firstName", "lastName", "email", "phone", "location", "sectionClicked", "message"] as const;

// Hardcoded Spanish labels for emails (emails are always sent in Spanish)
const commonLabels: {
  [key in keyof Omit<TCommonForm, "message" | "terms">]: string;
} = {
  firstName: "Nombre",
  lastName: "Apellidos",
  email: "Correo electrónico",
  phone: "Teléfono",
  location: "Provincia de residencia actual",
};

// Terms field is special. It's required to be checked, but the label has a special construction
// and it's not shown in the email forwarding.

/** This labels will be used to construct the forwarded emails - hardcoded in Spanish */
export const formLabels = {
  createBrick: {
    ...commonLabels,
    message: "¿Qué evento vas a realizar?\n¿Dónde va a ser?\nMAM promocionará tu evento en nuestras redes sociales.",
    sectionClicked: "Nombre del evento",
  },
  committee: {
    ...commonLabels,
    message:
      "Lee el contenido de nuestra página web ¡No te olvides de nada!\n\n- ¿Queda claro el proyecto que estamos llevando a cabo?\n- ¿Se transmite la situación de Ukunda?\n- ¿Transmite la importancia de esta acción?\n- ¿Consideras el proyecto transparente? \n\nMira nuestras redes sociales.\n\n¿Echas algo en falta?\n¿Reflejan nuestra visión misión y valores sobre la cooperación?\n\nHaz un comentario. No te cortes, tu opinión nos sirve para mejorar. Refleja todo aquello que valoras y lo que cambiarías.",
  },
  partner: {
    ...commonLabels,
    message:
      "Cuéntanos sobre ti. ¿Tuviste alguna experiencia previa en voluntariado? ¿Nacional o internacional? ¿En qué organización? ¿Cuánto tiempo? ¿Por qué quieres colaborar con MAM? ¿Que crees poder aportar a MAM?",
  },
  subscribe: pickAttributes(commonLabels, ["email"]),
} satisfies {
  [Key in TFormKeys]: Record<Exclude<keyof TForm[Key], "terms">, string>;
};
