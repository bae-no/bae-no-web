import { useEffect, useRef, useState } from "react";

import { useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";
import Script from "next/script";

import { useWindowSize } from "src/hooks/useWindowSize";
import { locationStorage } from "src/store/location";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { colors } from "src/ui/tokens/color";

declare global {
  interface Window {
    daum: any;
  }
}

const THEME_OBJ = {
  bgColor: colors.black9,
  contentBgColor: colors.white,
  emphTextColor: colors.info1,
  outlineColor: colors.black7,
  pageBgColor: colors.black10,
  postcodeTextColor: colors.danger1,
  queryTextColor: colors.black2,
  searchBgColor: colors.white,
  textColor: colors.black2,
};

const SearchLocationDaum = () => {
  const daumLocationSearchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const setLocation = useSetReastorage(locationStorage);
  const { nextUrl } = router.query as { [key: string]: string };
  const [isScriptLoading, setIsScriptLoading] = useState(false);

  const { width, height } = useWindowSize();
  const handleBack = () => {
    router.back();
  };

  const handleDaumPostcode = () => {
    setIsScriptLoading(true);
  };

  useEffect(() => {
    if (!daumLocationSearchRef.current || !isScriptLoading) return;
    new window.daum.Postcode({
      height: `${height - height * 0.1}`,
      onclose(state: "FORCE_CLOSE" | "COMPLETE_CLOSE") {
        if (state === "COMPLETE_CLOSE") {
          router.back();
        }
      },
      oncomplete(data: { address: string; jibunAddress: string }) {
        const { address: roadAddress, jibunAddress } = data;
        setLocation({
          jibunAddress,
          roadAddress,
        });
        router.back();
        router.push(nextUrl);
      },
      theme: THEME_OBJ,
      width,
    }).embed(daumLocationSearchRef.current);
  }, [height, isScriptLoading, nextUrl, router, setLocation, width]);
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        onReady={handleDaumPostcode}
      />
      <Box>
        <Box cursor="pointer" px="16" py="20" width="fit" onClick={handleBack}>
          <Icon name="arrow-left" />
        </Box>
        <div ref={daumLocationSearchRef} />
      </Box>
    </>
  );
};

export default SearchLocationDaum;