import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import { reastorage } from "@reastorage/react";
import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

import { Location } from "./type";

interface SetLocationProps {
  additionalExplanation?: string;
  location: Location;
  nextUrl: string;
  setLocation: Dispatch<SetStateAction<Location>>;
  title: string;
}

const SearchLocation = ({
  location,
  setLocation,
  title,
  additionalExplanation,
  nextUrl,
}: SetLocationProps) => {
  const router = useRouter();

  const getInputValue = () => {
    if (location?.roadAddress) return location?.roadAddress;
    if (location?.jibunAddress) return location?.jibunAddress;
    return "";
  };

  useEffect(() => {
    reastorage("nextUrl", "").set(nextUrl);
    const { jibunAddress, roadAddress } = reastorage("location", {
      jibunAddress: "",
      roadAddress: "",
    }).get();
    setLocation({ jibunAddress, roadAddress });
  }, [setLocation, nextUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = e;
    setLocation((prev) => {
      if (id === "roadAddress") {
        reastorage("location", { jibunAddress: "", roadAddress: "" }).set({
          jibunAddress: "",
          roadAddress: value,
        });
        return { ...prev, roadAddress: value };
      }
      if (id === "jibunAddress") {
        reastorage("location", { jibunAddress: "", roadAddress: "" }).set({
          jibunAddress: value,
          roadAddress: "",
        });
        return { ...prev, jibunAddress: value };
      }
      return prev;
    });
  };
  const handleClear = () => {
    setLocation({ jibunAddress: "", roadAddress: "" });
    reastorage("location", { jibunAddress: "", roadAddress: "" }).reset();
  };

  const handleSearchIconClick = () => {
    router.push("/search-location/SearchLocationDaum");
  };

  const handleMapOpen = () => {
    router.push("/search-location/SearchLocationMap");
  };

  const handleInputClick = () => {
    if (location.roadAddress || location.jibunAddress) return;
    router.push("/search-location/SearchLocationDaum");
  };

  const handleBack = () => {
    reastorage("location", null).reset();
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
            value={getInputValue()}
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
  );
};
export default SearchLocation;
