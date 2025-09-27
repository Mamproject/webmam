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

export default async function Root(props: LayoutProps<"/[lang]">) {
  const params = await props.params;
  const { children } = props;

  const lang = params.lang as Locale;
  const dictionary = await getDictionary(lang);
  const cookies = await getAppCookies();

  return (
    <html lang={lang}>
      <body
        className={cn(
          "bg-purple flex h-svh flex-col font-light whitespace-pre-wrap",
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
          <CookiesManager dictionary={dictionary} cookies={cookies} lang={lang} />
          <TermsModal dictionary={dictionary} locale={lang} />
        </ToastProvider>
      </body>

      <WithCaptcha googleCookies={cookies.google} />
    </html>
  );
}
