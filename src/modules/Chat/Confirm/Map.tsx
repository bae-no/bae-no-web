import { ComponentProps } from "react";

import { Map, useCenter } from "@r2don/react-naver-map";

import useCurrentLocation from "src/hooks/useCurrentLocation";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

import { mapCss } from "./map.css";

interface ConfirmMapProps {
  center: Required<ComponentProps<typeof Map>>["center"];
}

const MapController = () => {
  const currentLocation = useCurrentLocation();
  const { setCenter } = useCenter();

  return (
    <Box
      aria-label="현재 위치로 이동"
      as="button"
      backgroundColor="white"
      bottom="16"
      boxShadow="overlay"
      br="half"
      p="12"
      position="absolute"
      right="16"
      type="button"
      onClick={() => setCenter(currentLocation)}
    >
      <Icon name="gps" />
    </Box>
  );
};

const ConfirmMap = ({ center }: ConfirmMapProps) => (
  <Map
    center={center}
    className={mapCss}
    draggable={false}
    maxZoom={18}
    minZoom={18}
    zoom={18}
  >
    <>
      <Box bottom="half" left="half" position="absolute" transform="xHalfMinus">
        <Icon color="orange2" name="mapMarker" />
      </Box>
      <MapController />
    </>
  </Map>
);

export default ConfirmMap;
