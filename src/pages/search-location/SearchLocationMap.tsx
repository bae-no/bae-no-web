import { useState } from "react";

import { Map as NaverMap, useNaverMapInit } from "@r2don/react-naver-map";
import { useReastorageValue } from "@reastorage/react";
import { useRouter } from "next/router";
import Script from "next/script";

import { MapOverlay } from "src/modules/SearchLocation/MapOverlay";
import { locationStorage } from "src/store/login";
import { BottomDrawer } from "src/ui/BottomDrawer";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

const clientId = process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID;

const SearchLocationMap = () => {
  const router = useRouter();
  const location = useReastorageValue(locationStorage);
  const { nextUrl } = router.query as { [key: string]: string };

  const [isScriptLoad, setIsScriptLoad] = useState(false);

  const handleNaverGeocode = () => {
    setIsScriptLoad(true);
  };

  useNaverMapInit({
    ncpClientId: clientId ?? "",
  });

  const handleClick = () => {
    router.replace(nextUrl);
  };

  if (!isScriptLoad)
    return (
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`}
        onReady={handleNaverGeocode}
      />
    );
  return (
    <>
      <NaverMap style={{ height: "100vh" }} zoom={20}>
        <MapOverlay />
      </NaverMap>
      <BottomDrawer open modal={false}>
        <Box gap="32">
          <Box gap="8">
            <Typography color="black2" fontSize="headline5">
              {location?.roadAddress}
            </Typography>
            <Box flexDirection="row">
              <Label color="gray">
                <Typography color="black3" fontSize="caption2-b">
                  지번
                </Typography>
              </Label>
              <Typography color="black2" fontSize="body2-m">
                {location?.jibunAddress}
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
