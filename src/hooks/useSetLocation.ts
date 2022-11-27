import { useReastorage } from "@reastorage/react";

import { locationStorage } from "src/store/location";
import { positionStorage } from "src/store/position";

export const useSetLocation = () => {
  const [location, setLocation] = useReastorage(locationStorage);
  const [position, setPosition] = useReastorage(positionStorage);

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
          const result = response.v2.address;
          setLocation({
            jibunAddress: result.jibunAddress,
            roadAddress: result.roadAddress,
          });
          setPosition({
            latitude: coords.y,
            longitude: coords.x,
          });
        }
        if (status === 400) {
          throw new Error("invalid request");
        }
        if (status === 500) {
          throw new Error("unknown error / io error");
        }
      },
    );
    return location;
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
          setPosition({
            latitude: resultLatitude,
            longitude: resultLongitude,
          });
          setLocation((prev) => {
            if (type === "road") return { ...prev, roadAddress: query };

            return { ...prev, jibunAddress: query };
          });
        }
        if (status === 400) {
          throw new Error("Bad Request Exception");
        }
        if (status === 500) {
          throw new Error("Unexpected Error");
        }
      },
    );
    return position;
  };
  return { getAddress, getPosition, location, position };
};
