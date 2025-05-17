import "server-only";

import { antonio, montserrat, openSans } from "@/assets/fonts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/Toast";
import WithCaptcha from "@/components/WithCaptcha";
import { getAppCookies } from "@/cookies/get-app-cookies";
import { getDictionary } from "@/i18n/get-dictionary";
import { ColorVariant } from "@/types/theme";
import type { Metadata } from "next";
import type { Locale } from "../../i18n/i18n-config";
import { i18n } from "../../i18n/i18n-config";
import "../../styles/globals.css";
import CookiesManager from "./components/cookies-manager";
import TermsModal from "@/components/TermsModal";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Mam Project",
};

export default async function Root(props: { children: React.ReactNode; params: Promise<{ lang: Locale }> }) {
  const params = await props.params;
  const { children } = props;

  const dictionary = await getDictionary(params.lang);
  const cookies = await getAppCookies();

  return (
    <html lang={params.lang}>
      <body
        className={cn(
          "flex h-svh flex-col whitespace-pre-wrap bg-purple font-light",
          openSans.className,
          openSans.variable,
          montserrat.variable,
          antonio.variable,
        )}
      >
        <ToastProvider>
          <Navbar
            dictionary={dictionary}
            labels={{ close: dictionary.close, support: dictionary.support }}
            variant={ColorVariant.Purple}
          />
          <div className="relative flex grow flex-col overflow-scroll bg-white">
            <div className="grow">{children}</div>
            <Footer dictionary={dictionary} />
          </div>
          <CookiesManager dictionary={dictionary} cookies={cookies} lang={params.lang} />
          <TermsModal dictionary={dictionary} locale={params.lang} />
        </ToastProvider>
      </body>

      <WithCaptcha googleCookies={cookies.google} />
    </html>
  );
}
