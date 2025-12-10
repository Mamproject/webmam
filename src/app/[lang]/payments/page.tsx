import LoadingFallback from "@/components/LoadingFallback";
import MdxStyler from "@/components/mdx-styler";
import dynamic from "next/dynamic";

export default async function Page() {
  const MdxContent = dynamic(() => import("../../../i18n/mdx/payments-es.mdx"), {
    loading: () => <LoadingFallback />,
  });

  return (
    <main className="py-8">
      <MdxStyler>
        <MdxContent />
      </MdxStyler>
    </main>
  );
}
