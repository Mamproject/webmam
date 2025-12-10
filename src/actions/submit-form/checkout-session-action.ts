"use server";

import { stripe } from "@/lib/stripe";
import { getTranslations } from "next-intl/server";
import type { TCheckoutFormWithMeta } from "@/utils/form-schemas";
import { CheckoutFormSchemaWithMeta } from "@/utils/form-schemas";
import { Value } from "@sinclair/typebox/value";
import type Stripe from "stripe";

type ActionResponse =
  | {
      status: "success";
      sessionId: string;
    }
  | {
      status: "error";
    };

export async function checkoutSessionAction(formData: TCheckoutFormWithMeta): Promise<ActionResponse> {
  try {
    const body = validateSchema(formData);
    const cancelSearchParams = new URLSearchParams({
      initialView: "form",
      amount: (formData.amount / 100).toString(),
      frequency: formData.frequency,
      terms: "true",
    }).toString();

    const t = await getTranslations();
    const mode = body.frequency === "one-time" ? "payment" : "subscription";
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: t("navigation.violet_bricks"),
              description: t("violetBricks.violet_bricks_description"),
            },
            unit_amount: body.amount,
            recurring: getRecurringSettings(body.frequency),
          },
          quantity: 1,
        },
      ],
      mode,
      success_url: `${body.origin}/${body.locale}/join?initialView=success`,
      cancel_url: `${body.origin}/${body.locale}/join?${cancelSearchParams}`,
      invoice_creation: mode === "payment" ? { enabled: true } : undefined,
      locale: body.locale as Stripe.Checkout.SessionCreateParams.Locale,
    });
    return {
      status: "success",
      sessionId: session.id,
    };
  } catch {
    return { status: "error" };
  }
}

const validateSchema = (body: unknown) => {
  const valid = Value.Check(CheckoutFormSchemaWithMeta, body);
  if (!valid) throw new Error("Invalid form");
  return body as TCheckoutFormWithMeta;
};

const getRecurringSettings = (
  frequency: TCheckoutFormWithMeta["frequency"],
): Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring | undefined => {
  switch (frequency) {
    case "one-time":
      return undefined;
    case "monthly":
      return {
        interval: "month",
        interval_count: 1,
      };
    case "quarterly":
      return {
        interval: "month",
        interval_count: 3,
      };
    case "yearly":
      return {
        interval: "year",
        interval_count: 1,
      };
  }
};
