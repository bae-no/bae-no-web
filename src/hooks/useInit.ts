import { useEffect } from "react";

import { getToken } from "src/utils";

import { useMounted } from "./useMounted";

export const useInit = () => {
  const mounted = useMounted();
  useEffect(() => {
    if (mounted) {
      getToken();
    }
  }, [mounted]);
};
