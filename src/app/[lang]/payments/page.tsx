import LoadingFallback from "@/components/LoadingFallback";
import MdxStyler from "@/components/mdx-styler";
import type { Locale } from "@/i18n/i18n-config";
import type { MDXProps } from "mdx/types";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const MdxContent = (
    {
      es: dynamic(() => import("../../../i18n/mdx/payments-es.mdx"), {
        loading: () => <LoadingFallback />,
      }),
    } satisfies Record<Locale, ComponentType<MDXProps>>
  )[lang];

  return (
    <main className="py-8">
      <MdxStyler>
        <MdxContent />
      </MdxStyler>
    </main>
  );
}
