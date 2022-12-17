import { useEffect } from "react";

import { useCenter } from "@r2don/react-naver-map";

import { useLocationConvert } from "src/hooks/useLocationConvert";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

interface MarkerProps {
  getLocationThroughCurrentPosition: () => void;
}

export const Marker = ({ getLocationThroughCurrentPosition }: MarkerProps) => {
  const { setCenter } = useCenter();
  const { getPosition, location } = useLocationConvert();

  useEffect(() => {
    const getPositionQuery = () => {
      if (location.roadAddress)
        return { locationValue: location.roadAddress, type: "road" };
      if (location.jibunAddress)
        return { locationValue: location.jibunAddress, type: "jibun" };
    };
    if (!location.jibunAddress && !location.roadAddress) {
      getLocationThroughCurrentPosition();
      return;
    }
    const query = getPositionQuery();
    if (!query) return;
    const { locationValue, type } = query;
    if (type !== "road" && type !== "jibun") return;
    const position = getPosition(locationValue, type);

    if (!position) return;
    const { latitude, longitude } = position;
    setCenter({ latitude, longitude });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
