import { useReastorage } from "@reastorage/react";

import { locationStorage, positionStorage } from "src/store/login";

interface SetLocationPositionStateParams {
  locationParams: {
    jibunAddress?: string;
    roadAddress?: string;
  };
  positionParams: {
    latitude: number;
    longitude: number;
  };
}

const errorHandling = (status: number) => {
  if (status === 400) {
    throw new Error("invalid request");
  }
  if (status === 500) {
    throw new Error("unknown error / io error");
  }
};

export const useLocationConvert = () => {
  const [location, setLocation] = useReastorage(locationStorage);
  const [position, setPosition] = useReastorage(positionStorage);

  const setLocationPositionState = ({
    locationParams,
    positionParams,
  }: SetLocationPositionStateParams) => {
    setLocation((prev) => ({ ...prev, ...locationParams }));
    setPosition(positionParams);
  };

  const getAddress = (coords: naver.maps.Coord) => {
    if (typeof window === undefined) return;
    window.naver.maps.Service?.reverseGeocode(
      {
        coords,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      (status: number, response: any) => {
        if (status === 200) {
          const locationParams = response.v2.address;
          const positionParams = {
            latitude: coords.y,
            longitude: coords.x,
          };
          setLocationPositionState({ locationParams, positionParams });
        }
        errorHandling(status);
      },
    );
  };

  const getPosition = (query: string, type: "road" | "jibun") => {
    if (typeof window === undefined) return;
    window.naver.maps.Service?.geocode(
      {
        query,
      },
      (status: number, response: any) => {
        if (status === 200) {
          const [resultLatitude, resultLongitude] = [
            response.v2.addresses[0].y,
            response.v2.addresses[0].x,
          ];
          const locationParams = { [`${type}Address`]: query };
          const positionParams = {
            latitude: Number(resultLatitude),
            longitude: Number(resultLongitude),
          };
          setLocationPositionState({ locationParams, positionParams });
        }
        errorHandling(status);
      },
    );
  };

  return { getAddress, getPosition, location, position };
};
