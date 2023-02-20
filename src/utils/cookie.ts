import { fromEntries, map, pipe } from "@fxts/core";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export function parseCookie() {
  return pipe(
    document.cookie.split("; "),
    map((cookie) => cookie.split("=") as [string, string]),
    fromEntries,
  );
}

interface CookieOptions {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
}

const parseCookieOptions = (options?: CookieOptions) => {
  if (!options) return "";
  const { domain, expires, httpOnly, path, sameSite, secure } = options;
  return [
    domain ? `domain=${domain}` : "",
    expires ? `expires=${expires.toUTCString()}` : "",
    httpOnly ? "httpOnly" : "",
    path ? `path=${path}` : "",
    sameSite ? `sameSite=${sameSite}` : "",
    secure ? "secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
};

export function setCookie<T>(key: string, value: T, options?: CookieOptions) {
  document.cookie = `${key}=${value}; ${parseCookieOptions(options)}`;
}

export function getCookie<T extends Record<string, unknown>, K extends keyof T>(
  key: K,
  cookies?: NextApiRequestCookies,
) {
  if (cookies) {
    return (cookies[key as string] ?? "") as T[K];
  }
  return parseCookie()[key as string] as T[K];
}
