import { useCallback, useEffect } from "react";

import { useCenter, useMapContext } from "@r2don/react-naver-map";
import { useRouter } from "next/router";

import { useDebouncedCallback } from "src/hooks/useDebouncedCallback";
import { useSetLocation } from "src/hooks/useSetLocation";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

import { Marker } from "../Marker";
import { gpsIconBoxCss } from "../searchLocation.css";

import { currentPositionIconBoxCss } from "./mapOverlay.css";

export const MapOverlay = () => {
  const { getCenter, setCenter } = useCenter();
  const { getAddress } = useSetLocation();
  const router = useRouter();

  const getAddressByDebounce = useDebouncedCallback(() => {
    getAddress(getCenter());
  }, 500);
  const map = useMapContext();

  const handleBack = () => {
    router.back();
  };

  const getLocationThroughCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ latitude, longitude });
      getAddress(getCenter());
    });
  }, [setCenter, getAddress, getCenter]);

  useEffect(() => {
    const listener = map.addListener("dragend", getAddressByDebounce);

    return () => map.removeListener(listener);
  }, [getAddressByDebounce, map]);

  return (
    <Box height="full" width="full">
      <Box
        aria-label="뒤로가는 버튼"
        as="button"
        cursor="pointer"
        px="16"
        py="20"
        type="button"
        width="fit"
        zIndex={1}
        onClick={handleBack}
      >
        <Icon name="arrow-left" />
      </Box>
      <Marker
        getLocationThroughCurrentPosition={getLocationThroughCurrentPosition}
      />
      <Box
        className={currentPositionIconBoxCss}
        flexDirection="row-reverse"
        position="fixed"
        px="16"
        width="full"
        zIndex={1}
      >
        <Box
          alignItems="center"
          aria-label="현재위치로 이동하는 버튼"
          as="button"
          backgroundColor="white"
          br="half"
          className={gpsIconBoxCss}
          cursor="pointer"
          justifyContent="center"
          size="48"
          type="button"
          onClick={getLocationThroughCurrentPosition}
        >
          <Icon name="gps" />
        </Box>
      </Box>
    </Box>
  );
};
