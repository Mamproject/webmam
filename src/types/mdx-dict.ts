import type { Locale } from "@/i18n/i18n-config";
import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

export type MdxDict = Record<Locale, ComponentType<MDXProps>>;
