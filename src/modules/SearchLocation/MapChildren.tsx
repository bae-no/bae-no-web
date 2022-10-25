import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

import { useCenter, useMapContext } from "@r2don/react-naver-map";

import { Box, Icon } from "src/ui";

import { Location } from "./type";

interface MapChildrenProps {
  location: Location;
  setIsSearchLocationMapOpen: Dispatch<SetStateAction<boolean>>;
  setLocationInMap: Dispatch<SetStateAction<Location>>;
}

export const MapChildren = ({
  setIsSearchLocationMapOpen,
  location,
  setLocationInMap,
}: MapChildrenProps) => {
  const { setCenter, getCenter } = useCenter();
  const map = useMapContext();

  const getLocationAddress = useCallback(() => {
    window.naver.maps.Service.reverseGeocode(
      {
        location: getCenter(),
        orders: [
          window.naver.maps.Service.OrderType.ADDR,
          window.naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      (status: number, response: any) => {
        if (status !== 200) return;
        const { jibunAddress, roadAddress } = response.v2.address;
        setLocationInMap({ jibunAddress, roadAddress });
      },
    );
  }, [setLocationInMap, getCenter]);

  const getPosition = useCallback(() => {
    if (!location.roadAddress || !location.jibunAddress) return;
    window.naver.maps.Service.geocode(
      {
        query: location.roadAddress ?? location.jibunAddress,
      },
      (status: number, response: any) => {
        if (status === 200) {
          const [latitude, longitude] = [
            response.v2.addresses[0].y,
            response.v2.addresses[0].x,
          ];
          setCenter({
            latitude,
            longitude,
          });
          getLocationAddress();
        }
      },
    );
  }, [
    location.roadAddress,
    location.jibunAddress,
    setCenter,
    getLocationAddress,
  ]);

  const getLocationThroughCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ latitude, longitude });
      getLocationAddress();
    });
  }, [setCenter, getLocationAddress]);

  const handleBack = () => {
    setIsSearchLocationMapOpen(false);
  };

  useEffect(() => {
    if (location.jibunAddress !== "" || location.roadAddress !== "") {
      getPosition();
      return;
    }
    getLocationThroughCurrentPosition();
  }, [
    getPosition,
    getLocationThroughCurrentPosition,
    location.jibunAddress,
    location.roadAddress,
  ]);

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
      <Box
        alignItems="center"
        height="full"
        justifyContent="center"
        width="full"
      >
        <Icon color="orange2" name="mapMarker" zIndex={1} />
      </Box>
      <Box
        bottom="2"
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
