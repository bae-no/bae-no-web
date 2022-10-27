import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { useNaverMapInit } from "@r2don/react-naver-map";
import { useRouter } from "next/router";
import Script from "next/script";

import { SearchLocationDaum } from "src/modules/SearchLocation/SearchLocationDaum";
import { Typography, Icon, Box, Input } from "src/ui";

import { SearchLocationMap } from "./SearchLocationMap";
import { Location } from "./type";

interface SetLocationProps {
  additionalExplanation?: string;
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
  title: string;
}

const clientId = process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID;

const SetLocation = ({
  location,
  setLocation,
  title,
  additionalExplanation,
}: SetLocationProps) => {
  const [isSearchLocationDaumOpen, setIsSearchLocationDaumOpen] =
    useState(false);
  const [isSearchLocationMapOpen, setIsSearchLocationMapOpen] = useState(false);
  const { isLoaded } = useNaverMapInit({
    ncpClientId: clientId ?? "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = e;
    setLocation((prev) => {
      if (id === "roadAddress") {
        return { ...prev, roadAddress: value };
      }
      if (id === "jibunAddress") {
        return { ...prev, jibunAddress: value };
      }
      return prev;
    });
  };
  const handleClear = () => {
    setLocation({ jibunAddress: "", roadAddress: "" });
  };

  const handleSearchIconClick = () => {
    setIsSearchLocationDaumOpen(true);
  };

  const handleMapOpen = () => {
    setIsSearchLocationMapOpen(true);
  };

  const handleInputClick = () => {
    if (location.roadAddress !== "" || location.jibunAddress !== "") return;
    setIsSearchLocationDaumOpen(true);
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`}
      />
      {!isSearchLocationDaumOpen && !isSearchLocationMapOpen && (
        <Box gap="32" zIndex={5}>
          <Box>
            <Box
              cursor="pointer"
              px="16"
              py="20"
              width="fit"
              onClick={handleBack}
            >
              <Icon name="arrow-left" />
            </Box>
          </Box>
          <Box gap="16" px="16">
            <Typography
              as="h1"
              color="black2"
              fontSize="headline2"
              whiteSpace="pre-line"
            >
              {title}
            </Typography>
            <Box>
              <Typography color="black4" fontSize="caption1-m">
                {additionalExplanation}
              </Typography>
              <Input
                id={location?.roadAddress ? "roadAddress" : "jibunAddress"}
                leftNode={
                  <Box cursor="pointer" onClick={handleSearchIconClick}>
                    <Icon name="icon_search" />
                  </Box>
                }
                placeholder="도로명, 건물명 또는 지번으로 검색"
                value={
                  location?.roadAddress
                    ? location?.roadAddress
                    : location.jibunAddress
                }
                variant="underline"
                onChange={handleChange}
                onClearClick={handleClear}
                onClick={handleInputClick}
              />
              <Box
                alignItems="center"
                cursor="pointer"
                flexDirection="row"
                gap="12"
                justifyContent="space-between"
                py="12"
              >
                <Box
                  alignItems="center"
                  cursor="pointer"
                  flexDirection="row"
                  gap="12"
                  onClick={handleMapOpen}
                >
                  <Icon name="gps" size="20" />
                  <Typography color="black2" fontSize="body1-m">
                    또는 현재 위치로 설정
                  </Typography>
                </Box>
                <Icon name="arrow-right" size="16" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isSearchLocationDaumOpen && (
        <SearchLocationDaum
          setIsSearchLocationDaumOpen={setIsSearchLocationDaumOpen}
          setLocation={setLocation}
        />
      )}
      {isSearchLocationMapOpen && (
        <SearchLocationMap
          isLoaded={isLoaded}
          location={location}
          setIsSearchLocationMapOpen={setIsSearchLocationMapOpen}
          setLocation={setLocation}
        />
      )}
    </>
  );
};
export default SetLocation;
