import "server-only";

import type { SendEmailCommandInput } from "@aws-sdk/client-sesv2";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { getEmailHtml } from "./email-generator";
import type { TForm, TFormKeys, TSentForm } from "@/utils/form-schemas";

export async function sendEmail(data: TSentForm & TForm[TFormKeys]) {
  const subject = subjects[data.formKey];
  const Charset = "UTF-8";
  const ses = new SESv2Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID!,
      secretAccessKey: process.env.AWS_ACCESS_SECRET!,
    },
    maxAttempts: 3,
  });
  const input: SendEmailCommandInput = {
    FromEmailAddress: process.env.AWS_EMAIL_SOURCE,
    Destination: { ToAddresses: [process.env.AWS_EMAIL_DESTINATION!] },
    Content: {
      Simple: {
        Subject: {
          Data: subject,
          Charset,
        },
        Body: {
          Html: {
            Data: await getEmailHtml(data, subject),
            Charset,
          },
        },
      },
    },
  };

  const command = new SendEmailCommand(input);
  await ses.send(command).catch((err) => {
    throw err;
  });
}

const subjects: { [K in TFormKeys]: string } = {
  subscribe: "Suscripción a newsletter",
  committee: "Formulario recibido: comité violeta",
  createBrick: "Formulario recibido: crear ladrillo solidario",
  partner: "Formulario recibido: personas puente",
};
