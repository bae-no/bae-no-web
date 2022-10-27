import { Dispatch, SetStateAction, useState } from "react";

import { Map as NaverMap } from "@r2don/react-naver-map";

import { useWindowSize } from "src/hooks";
import { BottomDrawer, Typography, Label, Button, Box } from "src/ui";

import { MapOverlay } from "./MapOverlay";
import { Location } from "./type";

declare global {
  interface Window {
    naver: any;
  }
}

interface SearchLocationMapProps {
  isLoaded: boolean;
  location: Location;
  setIsSearchLocationMapOpen: Dispatch<SetStateAction<boolean>>;
  setLocation: Dispatch<SetStateAction<Location>>;
}

export const SearchLocationMap = ({
  setIsSearchLocationMapOpen,
  isLoaded,
  setLocation,
  location,
}: SearchLocationMapProps) => {
  const [locationInMap, setLocationInMap] = useState<Location>({
    jibunAddress: "",
    roadAddress: "",
  });
  const { width, height } = useWindowSize();

  const handleClick = () => {
    if (!locationInMap) return;
    setLocation(locationInMap);
    setIsSearchLocationMapOpen(false);
  };

  if (!isLoaded || width === 0 || height === 0) return null;

  return (
    <>
      <NaverMap style={{ height, width }} zoom={40}>
        <MapOverlay
          location={location}
          setIsSearchLocationMapOpen={setIsSearchLocationMapOpen}
          setLocationInMap={setLocationInMap}
        />
      </NaverMap>
      <BottomDrawer open modal={false}>
        <Box gap="32">
          <Box gap="8">
            <Typography color="black2" fontSize="headline5">
              {locationInMap?.roadAddress}
            </Typography>
            <Box flexDirection="row">
              <Label color="gray">
                <Typography color="black3" fontSize="caption2-b">
                  지번
                </Typography>
              </Label>
              <Typography color="black2" fontSize="body2-m">
                {locationInMap?.jibunAddress}
              </Typography>
            </Box>
          </Box>
          <Button onClick={handleClick}>이 주소로 설정하기</Button>
        </Box>
      </BottomDrawer>
    </>
  );
};
