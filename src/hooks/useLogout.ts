import { useCallback } from "react";

import { useRouter } from "next/router";

import { setCookie } from "src/utils/cookie";

export const useLogout = () => {
  const router = useRouter();

  return useCallback(() => {
    setCookie("token", "", {
      path: "/",
    });
    router.replace("/login");
  }, [router]);
};
