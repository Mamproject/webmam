"use client";

import { antonio } from "@/assets/fonts";
import { socialMediaKeys } from "@/settings/socialMedia";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { FC } from "react";
import Container from "./Container";
import Heading from "./Heading";
import SocialMediaButton from "./SocialMediaButton";

const Footer: FC = () => {
  const t = useTranslations();
  const setCookiesModal = useStore((state) => state.setCookiesModal);
  const setTermsModal = useStore((state) => state.setTermsModal);

  return (
    <footer className={`bg-purple ${antonio.className}`}>
      <Container horizontal className="flex flex-col items-center gap-4 py-8">
        <Heading level={2} color="white" className="m-0!">
          {t("common.info")}
        </Heading>

        <section className="flex flex-wrap items-center justify-center gap-4 text-lg text-white">
          <button onClick={() => setTermsModal(true)}> {t("terms.privacy_policy")}</button>
          <button onClick={() => setCookiesModal(true)}> {t("cookies.cookies_policy")}</button>
          <Link href="mailto:mamproyectukunda@gmail.com"> {t("common.contact")}</Link>
        </section>

        <section className="flex justify-center gap-4">
          {socialMediaKeys.map((key) => (
            <SocialMediaButton key={key} variant={key} />
          ))}
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
