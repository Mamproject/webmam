"use client";

import CookiesBanner from "@/components/CookiesBanner";
import CookiesModal from "@/components/CookiesModal";
import { customizeCookies } from "@/cookies/cookies-actions";
import type { AppCookies } from "@/cookies/settings";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/i18n/i18n-config";
import { useStore } from "@/store";
import type { FC } from "react";
import { useEffect, useState } from "react";

interface CookiesManagerProps {
  cookies: AppCookies;
  dictionary: Dictionary;
  lang: Locale;
}

const CookiesManager: FC<CookiesManagerProps> = ({ dictionary, cookies, lang }) => {
  const [openBanner, setOpenBanner] = useState(false);
  const cookiesModal = useStore((state) => state.cookiesModal);
  const setCookiesModal = useStore((state) => state.setCookiesModal);

  useEffect(() => {
    if (!cookies.essential) {
      setOpenBanner(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CookiesBanner
        dictionary={dictionary}
        open={openBanner}
        onOpenChange={setOpenBanner}
        openSettings={() => setCookiesModal(true)}
      />
      <CookiesModal
        customizeCookiesAction={customizeCookies}
        dictionary={dictionary}
        cookies={cookies}
        open={cookiesModal}
        onOpenChange={setCookiesModal}
        onSavedPreferences={() => setOpenBanner(false)}
        lang={lang}
      />
    </>
  );
};

export default CookiesManager;
