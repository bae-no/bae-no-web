import { useEffect } from "react";

import { useReastorage } from "@reastorage/react";
import { useRouter } from "next/router";

import { locationStorage } from "src/store/location";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

interface SetLocationProps {
  additionalExplanation?: string;
  nextUrl: string;
  title: string;
}

const SearchLocation = ({
  title,
  additionalExplanation,
  nextUrl,
}: SetLocationProps) => {
  const router = useRouter();
  const [location, setLocation] = useReastorage(locationStorage);

  useEffect(() => {
    locationStorage.reset();
  }, [setLocation, nextUrl]);

  const handleClear = () => {
    setLocation({ jibunAddress: "", roadAddress: "" });
    locationStorage.reset();
  };

  const handleSearchIconClick = () => {
    router.push({
      pathname: "/search-location/SearchLocationDaum",
      query: { nextUrl },
    });
  };

  const handleMapOpen = () => {
    router.push({
      pathname: "/search-location/SearchLocationMap",
      query: { nextUrl },
    });
  };

  const handleInputClick = () => {
    if (location.roadAddress || location.jibunAddress) return;
    router.push({
      pathname: "/search-location/SearchLocationDaum",
      query: { nextUrl },
    });
  };

  const handleBack = () => {
    locationStorage.reset();
    router.back();
  };

  return (
    <Box gap="32" zIndex={5}>
      <Box>
        <Box cursor="pointer" px="16" py="20" width="fit" onClick={handleBack}>
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
            variant="underline"
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
  );
};
export default SearchLocation;
