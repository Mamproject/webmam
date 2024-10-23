import "server-only";

export const validateCaptcha = async (token: string, expectedAction: string) => {
  const res = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/mam-project-temp-1698585382220/assessments?key=${process.env.GRECAPTCHA_API_KEY}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        event: {
          token,
          expectedAction,
          siteKey: process.env.NEXT_PUBLIC_GRECAPTCHA_KEY,
        },
      }),
    },
  ).then((res) => res.json());

  const isValid = res.tokenProperties?.valid && (res.riskAnalysis?.score ?? 0) > 0.5;

  if (!isValid) {
    throw new Error("Invalid captcha");
  }
};
