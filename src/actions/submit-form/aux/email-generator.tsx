import type { Dictionary } from "@/i18n/dictionaries/es";
import es from "@/i18n/dictionaries/es";
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
import config from "../../../../tailwind.config";

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
    <Tailwind config={config}>
      <Body className='bg-white font-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica_Neue",sans-serif]'>
        <Container className="mx-auto max-w-[34rem] pb-8 pt-6">
          <Heading className="text-2xl text-purple-hex">{subject}</Heading>
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

export const getEmailHtml = (data: TSentForm & TForm[TFormKeys], subject: string) =>
  render(<Email subject={subject} sections={getOrderedSections(data)} />);

const getOrderedSections = (data: TSentForm & TForm[TFormKeys]) => {
  const { formKey, ...rest } = data;
  const orderedSections: Section[] = [];
  orderedLabelKeys.forEach((labelKey) => {
    if (labelKey in rest) {
      const title = es[(formLabels[formKey] as Record<string, keyof Dictionary>)[labelKey]];
      const content = rest[labelKey as keyof typeof rest & typeof labelKey];
      orderedSections.push({ title, content: content.toString() });
    }
  });
  return orderedSections;
};

const orderedLabelKeys = ["firstName", "lastName", "email", "phone", "location", "sectionClicked", "message"] as const;

const commonLabels: {
  [key in keyof Omit<TCommonForm, "message" | "terms">]: keyof Dictionary;
} = {
  firstName: "name",
  lastName: "surname",
  email: "email",
  phone: "phone",
  location: "location",
};
// Terms field is special. It's required to be checked, but the label has a special construction
// and it's not shown in the email forwarding.

/** This labels will be used to construct the forwarded emails */
export const formLabels = {
  createBrick: { ...commonLabels, message: "event_data_label", sectionClicked: "create_brick_event" },
  committee: { ...commonLabels, message: "committee_form_message" },
  partner: { ...commonLabels, message: "about_you" },
  subscribe: pickAttributes(commonLabels, ["email"]),
} satisfies {
  [Key in TFormKeys]: Record<Exclude<keyof TForm[Key], "terms">, keyof Dictionary>;
};
