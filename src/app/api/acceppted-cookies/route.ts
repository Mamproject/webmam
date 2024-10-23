import type { AppCookies, AppCookiesKeys} from "@/cookies/settings";
import { appCookies } from "@/cookies/settings";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // returns which cookies are accepted
  const cookiesStore = cookies();
  const result = {} as AppCookies;
  Object.entries(appCookies).forEach(
    ([key, { name }]) => cookiesStore.get(name)?.value === "1" && (result[key as AppCookiesKeys] = true),
  );
  return NextResponse.json(result);
}
