"use client";

let grecaptchaLoaded = false;

export const setUpGrecaptchaCallback = () => {
  if (typeof window === "undefined") return;
  window.onLoadGrecaptcha = () => {
    grecaptchaLoaded = true;
  };
};

export const isGrecaptchaLoaded = () => grecaptchaLoaded;
