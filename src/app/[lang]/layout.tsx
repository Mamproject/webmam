import "server-only";

import { antonio, montserrat, openSans } from "@/assets/fonts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TermsModal from "@/components/TermsModal";
import { ToastProvider } from "@/components/Toast";
import WithCaptcha from "@/components/WithCaptcha";
import { getAppCookies } from "@/cookies/get-app-cookies";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ColorVariant } from "@/types/theme";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import "../../styles/globals.css";
import CookiesManager from "./components/cookies-manager";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Mam Project",
};

export default async function Root(props: LayoutProps<"/[lang]">) {
  const params = await props.params;
  const { children } = props;

  const lang = params.lang as Locale;
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
        <NextIntlClientProvider>
          <ToastProvider>
            <Navbar variant={ColorVariant.Purple} />
            <div className="relative flex grow flex-col overflow-scroll bg-white">
              <div className="grow">{children}</div>
              <Footer />
            </div>
            <CookiesManager cookies={cookies} />
            <TermsModal />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>

      <WithCaptcha googleCookies={cookies.google} />
    </html>
  );
}
