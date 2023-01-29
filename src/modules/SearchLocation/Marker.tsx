import { useEffect } from "react";

import { useCenter } from "@r2don/react-naver-map";
import { useReastorageValue } from "@reastorage/react";

import { locationStorage, positionStorage } from "src/store/login";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

interface MarkerProps {
  getLocationThroughCurrentPosition: () => void;
}

export const Marker = ({ getLocationThroughCurrentPosition }: MarkerProps) => {
  const { setCenter } = useCenter();
  const position = useReastorageValue(positionStorage);
  const location = useReastorageValue(locationStorage);

  useEffect(() => {
    if (!location.jibunAddress && !location.roadAddress) {
      getLocationThroughCurrentPosition();
      return;
    }
    const { latitude, longitude } = position;
    setCenter({ latitude, longitude });
  }, [
    getLocationThroughCurrentPosition,
    location.jibunAddress,
    location.roadAddress,
    position,
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
