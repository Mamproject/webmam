"use client";

import { antonio } from "@/assets/fonts";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { socialMediaKeys } from "@/settings/socialMedia";
import { useStore } from "@/store";
import Link from "next/link";
import type { FC } from "react";
import Container from "./Container";
import Heading from "./Heading";
import SocialMediaButton from "./SocialMediaButton";

interface FooterProps {
  dictionary: Dictionary;
}

const Footer: FC<FooterProps> = ({ dictionary }) => {
  const setCookiesModal = useStore((state) => state.setCookiesModal);
  const setTermsModal = useStore((state) => state.setTermsModal);

  return (
    <footer className={`bg-purple ${antonio.className}`}>
      <Container horizontal className="flex flex-col items-center gap-4 py-8">
        <Heading level={2} color="white" className="!m-0">
          {dictionary.info}
        </Heading>

        <section className="flex flex-wrap items-center justify-center gap-4 text-lg text-white">
          <button onClick={() => setTermsModal(true)}>{dictionary.privacy_policy}</button>
          <button onClick={() => setCookiesModal(true)}>{dictionary.cookies_policy}</button>
          <Link href="mailto:mamproyectukunda@gmail.com">{dictionary.contact}</Link>
        </section>

        <section className="flex justify-center gap-4">
          {socialMediaKeys.map((key) => (
            <SocialMediaButton key={key} variant={key} dictionary={dictionary} />
          ))}
        </section>
      </Container>
    </footer>
  );
};

export default Footer;


