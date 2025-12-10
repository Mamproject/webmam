"use client";

import CookiesBanner from "@/components/CookiesBanner";
import CookiesModal from "@/components/CookiesModal";
import { customizeCookies } from "@/cookies/cookies-actions";
import type { AppCookies } from "@/cookies/settings";
import { useStore } from "@/store";
import type { FC } from "react";
import { useEffect, useState } from "react";

interface CookiesManagerProps {
  cookies: AppCookies;
}

const CookiesManager: FC<CookiesManagerProps> = ({ cookies }) => {
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
      <CookiesBanner open={openBanner} onOpenChange={setOpenBanner} openSettings={() => setCookiesModal(true)} />
      <CookiesModal
        customizeCookiesAction={customizeCookies}
        cookies={cookies}
        open={cookiesModal}
        onOpenChange={setCookiesModal}
        onSavedPreferences={() => setOpenBanner(false)}
      />
    </>
  );
};

export default CookiesManager;
