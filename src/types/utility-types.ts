import type { Messages, NamespaceKeys, NestedKeyOf, useTranslations } from "next-intl";

export type WithoutChildren<T> = Omit<T, "children">;

export type TranslatorFunction<NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never> = ReturnType<
  typeof useTranslations<NestedKey>
>;
