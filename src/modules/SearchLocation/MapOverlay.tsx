import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

import { useCenter, useMapContext } from "@r2don/react-naver-map";
import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

import { Marker } from "./Marker";
import { gpsIconBoxCss } from "./searchLocation.css";
import { Location } from "./type";

interface MapOverlayProps {
  location: Location;
  setLocationInMap: Dispatch<SetStateAction<Location>>;
}

export const MapOverlay = ({ location, setLocationInMap }: MapOverlayProps) => {
  const { getCenter, setCenter } = useCenter();
  const router = useRouter();
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
    router.back();
  };

  const getLocationThroughCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCenter({ latitude, longitude });
      getLocationAddress();
    });
  }, [setCenter, getLocationAddress]);

  useEffect(() => {
    let listener: {
      eventName: string;
      listener: (event: any) => any;
      listenerId: string;
      target: any;
    };

    let timer: NodeJS.Timeout;
    map.addListener("dragend", () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        getLocationAddress();
      }, 500);
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
          className={gpsIconBoxCss}
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
