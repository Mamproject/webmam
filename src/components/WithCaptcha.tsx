"use client";

import { setUpGrecaptchaCallback } from "@/utils/grecaptcha";
import { usePathname } from "next/navigation";
import Script from "next/script";
import type { FC } from "react";

interface WithCaptchaProps {
  googleCookies: boolean;
}

const pathsWithCaptcha = ["/join", "/become-member"];

setUpGrecaptchaCallback();

const WithCaptcha: FC<WithCaptchaProps> = ({ googleCookies }) => {
  const pathname = usePathname();
  const isPathWithCaptcha = pathsWithCaptcha.some((p) => pathname.includes(p));

  return googleCookies && isPathWithCaptcha ? (
    <Script
      src={`https://www.google.com/recaptcha/enterprise.js?onload=onLoadGrecaptcha&render=${process.env.NEXT_PUBLIC_GRECAPTCHA_KEY}`}
      async
      defer
    />
  ) : null;
};

export default WithCaptcha;
