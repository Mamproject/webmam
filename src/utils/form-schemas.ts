import type { Static, TObject } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { TypeSystem } from "@sinclair/typebox/system";
import { rEmail } from "./regex";

TypeSystem.Format("email", (value) => rEmail.test(value));

export const CheckoutFormSchema = Type.Object({
  frequency: Type.Union([
    Type.Literal("one-time"),
    Type.Literal("monthly"),
    Type.Literal("quarterly"),
    Type.Literal("yearly"),
  ]),
  amount: Type.Number(),
  terms: Type.Boolean(),
});
export type TCheckoutForm = Static<typeof CheckoutFormSchema>;

export const CheckoutFormSchemaWithMeta = Type.Intersect([
  CheckoutFormSchema,
  Type.Object({
    origin: Type.String(),
    locale: Type.String(),
  }),
]);
export type TCheckoutFormWithMeta = Static<typeof CheckoutFormSchemaWithMeta>;

const CommonFormSchema = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ format: "email" }),
  phone: Type.String(),
  location: Type.String(),
  message: Type.String(),
  terms: Type.Boolean(),
});
export type TCommonForm = Static<typeof CommonFormSchema>;

const SubscribeFormSchema = Type.Pick(CommonFormSchema, ["email", "terms"]);
export type TSubscribeForm = Static<typeof SubscribeFormSchema>;

const CreateBrickFormSchema = Type.Composite([
  CommonFormSchema,
  Type.Object({
    sectionClicked: Type.String(),
  }),
]);
export type TCreateBrickForm = Static<typeof CreateBrickFormSchema>;

const AllFormKeysSchema = Type.Union([
  Type.Literal("createBrick"),
  Type.Literal("committee"),
  Type.Literal("partner"),
  Type.Literal("subscribe"),
]);
export type TFormKeys = Static<typeof AllFormKeysSchema>;

export const FormSchemas = {
  committee: CommonFormSchema,
  partner: CommonFormSchema,
  createBrick: CreateBrickFormSchema,
  subscribe: SubscribeFormSchema,
} satisfies {
  [key in TFormKeys]: TObject;
};
export type TForm = { [key in TFormKeys]: Static<(typeof FormSchemas)[key]> };
// TODO: Improve form types to work with discriminated unions

export const SentFormSchema = Type.Object({
  token: Type.String(),
  formKey: AllFormKeysSchema,
});
export type TSentForm = Static<typeof SentFormSchema>;
