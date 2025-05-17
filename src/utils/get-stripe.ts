import type { AppCookies } from "@/cookies/settings";
import type { Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = async () => {
  if (!stripePromise) {
    try {
      const res = await fetch("/api/accepted-cookies");
      if (!res.ok) throw new Error("Couldn't get cookies' preferences");
      const { stripe }: AppCookies = await res.json();
      if (!stripe) throw new Error("Stripe cookies not accepted");
      // dynamic import to avoid preloading Stripe's JS
      const { loadStripe } = await import("@stripe/stripe-js");
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    } catch {
      return null;
    }
  }
  return stripePromise;
};

export default getStripe;
