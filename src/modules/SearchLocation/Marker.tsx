import { useCallback, useEffect } from "react";

import { useCenter } from "@r2don/react-naver-map";

import { Box, Icon } from "src/ui";

import { Location } from "./type";

interface MarkerProps {
  getLocationAddress: () => void;
  getLocationThroughCurrentPosition: () => void;
  location: Location;
}

export const Marker = ({
  getLocationAddress,
  location,
  getLocationThroughCurrentPosition,
}: MarkerProps) => {
  const { setCenter } = useCenter();

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
          return;
        }
        if (status === 400) {
          throw new Error("Bad Request Exception");
        }
        if (status === 500) {
          throw new Error("Unexpected Error");
        }
      },
    );
  }, [
    location.roadAddress,
    location.jibunAddress,
    setCenter,
    getLocationAddress,
  ]);

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
  return (
    <Box alignItems="center" height="full" justifyContent="center" width="full">
      <Icon color="orange2" name="mapMarker" zIndex={1} />
    </Box>
  );
};
