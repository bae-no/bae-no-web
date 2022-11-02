import { useState } from "react";

import { Map as NaverMap, useNaverMapInit } from "@r2don/react-naver-map";
import { reastorage } from "@reastorage/react";
import { useRouter } from "next/router";
import Script from "next/script";

import { useWindowSize } from "src/hooks/useWindowSize";
import { MapOverlay } from "src/modules/SearchLocation/MapOverlay";
import { BottomDrawer } from "src/ui/BottomDrawer";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

import { Location } from "../../modules/SearchLocation/type";

declare global {
  interface Window {
    naver: any;
  }
}

const clientId = process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID;

const SearchLocationMap = () => {
  const router = useRouter();
  const [locationInMap, setLocationInMap] = useState<Location>({
    jibunAddress: "",
    roadAddress: "",
  });

  const [isScriptLoad, setIsScriptLoad] = useState(false);

  const handleNaverGeocode = () => {
    setIsScriptLoad(true);
  };

  const { roadAddress, jibunAddress } = reastorage("location", {
    jibunAddress: "",
    roadAddress: "",
  }).get();

  const { width, height } = useWindowSize();
  const { isLoaded } = useNaverMapInit({
    ncpClientId: clientId ?? "",
  });

  const handleClick = () => {
    if (!locationInMap) return;
    reastorage("location", {
      jibunAddress: "",
      roadAddress: "",
    }).set({
      jibunAddress: locationInMap.jibunAddress ?? "",
      roadAddress: locationInMap.roadAddress ?? "",
    });
    const nextUrl = reastorage("nextUrl", "").get();
    router.push(nextUrl);
  };

  if (
    (!isLoaded && !isScriptLoad) ||
    width === 0 ||
    height === 0 ||
    (isLoaded && !isScriptLoad)
  )
    return (
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`}
        onReady={handleNaverGeocode}
      />
    );
  return (
    <>
      <NaverMap style={{ height, width }} zoom={20}>
        <MapOverlay
          location={{ jibunAddress, roadAddress }}
          setLocationInMap={setLocationInMap}
        />
      </NaverMap>
      <BottomDrawer open modal={false}>
        <Box gap="32">
          <Box gap="8">
            <Typography color="black2" fontSize="headline5">
              {locationInMap?.roadAddress}
            </Typography>
            <Box flexDirection="row">
              <Label color="gray">
                <Typography color="black3" fontSize="caption2-b">
                  지번
                </Typography>
              </Label>
              <Typography color="black2" fontSize="body2-m">
                {locationInMap?.jibunAddress}
              </Typography>
            </Box>
          </Box>
          <Button onClick={handleClick}>이 주소로 설정하기</Button>
        </Box>
      </BottomDrawer>
    </>
  );
};

export default SearchLocationMap;
