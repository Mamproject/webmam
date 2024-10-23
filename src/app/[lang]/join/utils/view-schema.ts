import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export const DonateSectionViewSchema = Type.Union([
  Type.Literal("initial"),
  Type.Literal("form"),
  Type.Literal("success"),
]);
export type TDonateSectionView = Static<typeof DonateSectionViewSchema>;
