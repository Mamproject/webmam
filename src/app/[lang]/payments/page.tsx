import LoadingFallback from "@/components/LoadingFallback";
import MdxStyler from "@/components/mdx-styler";
import type { Locale } from "@/i18n/i18n-config";
import type { MDXProps } from "mdx/types";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export default async function Page(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const { lang } = params;

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
