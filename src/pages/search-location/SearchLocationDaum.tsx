import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import Script from "next/script";

import { useSetLocation } from "src/hooks/useSetLocation";
import { useWindowSize } from "src/hooks/useWindowSize";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { colors } from "src/ui/tokens/color";

const clientId = process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID;

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
  const { getPosition } = useSetLocation();
  const { nextUrl } = router.query as { [key: string]: string };
  const [isScriptLoading, setIsScriptLoading] = useState({
    daum: false,
    naver: false,
  });

  const { width, height } = useWindowSize();
  const handleBack = () => {
    router.back();
  };

  const handleDaumPostcode = () => {
    setIsScriptLoading((prev) => ({ ...prev, daum: true }));
  };
  const handleNaverGeocode = () => {
    setIsScriptLoading((prev) => ({ ...prev, naver: true }));
  };

  useEffect(() => {
    if (
      !daumLocationSearchRef.current ||
      !isScriptLoading.daum ||
      !isScriptLoading.naver
    )
      return;

    new window.daum.Postcode({
      height: `${height - height * 0.1}`,
      oncomplete(data: { address: string; jibunAddress: string }) {
        const { address: roadAddress, jibunAddress } = data;
        getPosition(
          roadAddress ?? jibunAddress,
          roadAddress ? "road" : "jibun",
        );
        router.back();
        router.push(nextUrl);
      },
      theme: THEME_OBJ,
      width,
    }).embed(daumLocationSearchRef.current);
  }, [height, isScriptLoading, nextUrl, router, getPosition, width]);
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        onReady={handleDaumPostcode}
      />
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`}
        onReady={handleNaverGeocode}
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
