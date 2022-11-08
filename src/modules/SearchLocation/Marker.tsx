import { useEffect } from "react";

import { useCenter } from "@r2don/react-naver-map";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

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
  const getPositionQuery = () => {
    if (location.roadAddress) return location.roadAddress;
    if (location.jibunAddress) return location.jibunAddress;
    return "";
  };

  useEffect(() => {
    if (!location.jibunAddress && !location.roadAddress) {
      getLocationThroughCurrentPosition();
      return;
    }
    const getPosition = () => {
      window.naver.maps.Service.geocode(
        {
          query: getPositionQuery(),
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
    };
    getPosition();
  }, [
    getLocationAddress,
    getLocationThroughCurrentPosition,
    location.jibunAddress,
    location.roadAddress,
    setCenter,
  ]);
  return (
    <Box
      alignItems="center"
      bottom="half"
      justifyContent="center"
      left="half"
      position="fixed"
    >
      <Icon color="orange2" name="mapMarker" zIndex={1} />
    </Box>
  );
};
