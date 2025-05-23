import twitterLogo from "@/assets/twitter.png";
import instagramLogo from "@/assets/instagram.png";
import facebookLogo from "@/assets/facebook_logo.png";

export const socialMediaData = {
  twitter: {
    logo: twitterLogo,
    url: process.env.NEXT_PUBLIC_TWITTER_URL,
  },
  instagram: {
    logo: instagramLogo,
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  },
  facebook: {
    logo: facebookLogo,
    url: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
};

export type SocialMediaType = keyof typeof socialMediaData;

// This is done to preserve the order of social media items when we iterate over them
export const socialMediaKeys: SocialMediaType[] = ["instagram", "facebook"];
