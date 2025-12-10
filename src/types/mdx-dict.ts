import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

export type MdxDict = Record<string, ComponentType<MDXProps>>;
