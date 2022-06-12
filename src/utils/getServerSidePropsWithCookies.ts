import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { setCookiesOnServer } from "./getCookie";

export function getServerSidePropsWithCookies(callback: GetServerSideProps) {
  return (ctx: GetServerSidePropsContext) => {
    setCookiesOnServer(ctx.req.cookies);
    return callback(ctx);
  };
}
