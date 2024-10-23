import { CheckoutFormSchema, type TCheckoutForm } from "@/utils/form-schemas";
import { DonateSectionViewSchema, type TDonateSectionView } from "./view-schema";
import { Value } from "@sinclair/typebox/value";

export type JoinSearchParams = {
  initialView?: TDonateSectionView;
} & TCheckoutForm;

export interface ParsedJoinSearchParams {
  initialView?: TDonateSectionView;
  initialFormValues?: TCheckoutForm;
}

export const parseJoinSearchParams = (params: JoinSearchParams): ParsedJoinSearchParams => {
  const { initialView, ...initialFormValues } = params;
  const convertedInitialFormValues = initialFormValues ? Value.Convert(CheckoutFormSchema, initialFormValues) : {};
  const result = {} as ParsedJoinSearchParams;

  if (initialView && Value.Check(DonateSectionViewSchema, initialView)) {
    result.initialView = initialView;
  }
  if (convertedInitialFormValues && Value.Check(CheckoutFormSchema, convertedInitialFormValues)) {
    result.initialFormValues = convertedInitialFormValues;
  }

  return result;
};
