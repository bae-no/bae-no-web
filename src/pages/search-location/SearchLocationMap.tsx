import { useState } from "react";

import { Map as NaverMap, useNaverMapInit } from "@r2don/react-naver-map";
import { useReastorage } from "@reastorage/react";
import { useRouter } from "next/router";
import Script from "next/script";

import { MapOverlay } from "src/modules/SearchLocation/MapOverlay";
import { locationStorage } from "src/store/location";
import { BottomDrawer } from "src/ui/BottomDrawer";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

import { Location } from "../../modules/SearchLocation/type";

const clientId = process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID;

const SearchLocationMap = () => {
  const router = useRouter();
  const [location, setLocation] = useReastorage(locationStorage);
  const { jibunAddress, roadAddress } = location;
  const { nextUrl } = router.query as { [key: string]: string };
  const [locationInMap, setLocationInMap] = useState<Location>({
    jibunAddress: "",
    roadAddress: "",
  });

  const [isScriptLoad, setIsScriptLoad] = useState(false);

  const handleNaverGeocode = () => {
    setIsScriptLoad(true);
  };

  useNaverMapInit({
    ncpClientId: clientId ?? "",
  });

  const handleClick = () => {
    if (!locationInMap) return;
    setLocation({
      jibunAddress: locationInMap.jibunAddress ?? "",
      roadAddress: locationInMap.roadAddress ?? "",
    });
    router.push(nextUrl);
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
