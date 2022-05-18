const serverCookies: Record<string, string> = {};

export function getCookie(key: string) {
  if (!global.window) {
    return serverCookies[key] || "";
  }

  const cookies = document.cookie.split(";");

  const value = cookies
    .find((v) => v.split("=")[0].trim() === key)
    ?.split("=")[1];

  return value;
}

export function setCookiesOnServer(cookies: Record<string, string>) {
  if (global.window)
    throw new Error("this function must not be called on client side");

  Object.assign(serverCookies, cookies);
}
