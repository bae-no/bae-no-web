import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

import { useCenter, useMapContext } from "@r2don/react-naver-map";

import { Box, Icon } from "src/ui";

import { Marker } from "./Marker";
import { Location } from "./type";

interface MapOverlayProps {
  location: Location;
  setIsSearchLocationMapOpen: Dispatch<SetStateAction<boolean>>;
  setLocationInMap: Dispatch<SetStateAction<Location>>;
}

export const MapOverlay = ({
  setIsSearchLocationMapOpen,
  location,
  setLocationInMap,
}: MapOverlayProps) => {
  const { getCenter, setCenter } = useCenter();
  const map = useMapContext();

  const getLocationAddress = useCallback(() => {
    window.naver.maps.Service.reverseGeocode(
      {
        location: getCenter(),
      },
      (status: number, response: any) => {
        if (status === 200) {
          const { jibunAddress, roadAddress } = response.v2.address;
          setLocationInMap({ jibunAddress, roadAddress });
        }
        if (status === 400) {
          throw new Error("invalid request");
        }
        if (status === 500) {
          throw new Error("unknown error / io error");
        }
      },
    );
  }, [setLocationInMap, getCenter]);

  const handleBack = () => {
    setIsSearchLocationMapOpen(false);
  };

  const getLocationThroughCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ latitude, longitude });
      getLocationAddress();
    });
  }, [setCenter, getLocationAddress]);

  useEffect(() => {
    const listener = map.addListener("dragend", () => {
      getLocationAddress();
    });
    return () => map.removeListener(listener);
  }, [map, getLocationAddress]);

  return (
    <Box height="full" width="full">
      <Box
        cursor="pointer"
        px="16"
        py="20"
        width="fit"
        zIndex={1}
        onClick={handleBack}
      >
        <Icon name="arrow-left" />
      </Box>
      <Marker
        getLocationAddress={getLocationAddress}
        getLocationThroughCurrentPosition={getLocationThroughCurrentPosition}
        location={location}
      />
      <Box
        bottom="232"
        flexDirection="row-reverse"
        position="fixed"
        px="16"
        width="full"
        zIndex={1}
      >
        <Box
          alignItems="center"
          backgroundColor="white"
          br="half"
          cursor="pointer"
          justifyContent="center"
          size="48"
          onClick={getLocationThroughCurrentPosition}
        >
          <Icon name="gps" />
        </Box>
      </Box>
    </Box>
  );
};
