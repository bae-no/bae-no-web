import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import { useWindowSize } from "src/hooks";
import { Box, Icon } from "src/ui";
import { colors } from "src/ui/tokens/color";

import { Location } from "./type";

declare global {
  interface Window {
    daum: any;
  }
}

const themeObj = {
  bgColor: colors.black9,
  contentBgColor: colors.white,
  emphTextColor: colors.info1,
  outlineColor: colors.black7,
  pageBgColor: colors.black10,
  postcodeTextColor: colors.danger1,
  queryTextColor: colors.black2,
  searchBgColor: colors.white,
  textColor: colors.black2,
};

interface SearchLocationDaumProps {
  setIsSearchLocationDaumOpen: Dispatch<SetStateAction<boolean>>;
  setLocation: Dispatch<SetStateAction<Location>>;
}

export const SearchLocationDaum = ({
  setIsSearchLocationDaumOpen,
  setLocation,
}: SearchLocationDaumProps) => {
  const daumLocationSearchRef = useRef<HTMLDivElement>(null);
  const { back } = useRouter();
  const { width, height } = useWindowSize();

  const handleBack = () => {
    setIsSearchLocationDaumOpen(false);
  };

  useEffect(() => {
    if (!daumLocationSearchRef.current) return;
    new window.daum.Postcode({
      height: `${height - height * 0.03}`,
      onclose(state: "FORCE_CLOSE" | "COMPLETE_CLOSE") {
        if (state === "COMPLETE_CLOSE") {
          back();
        }
      },
      oncomplete(data: { address: string; jibunAddress: string }) {
        const { address, jibunAddress } = data;
        setLocation({ jibunAddress, roadAddress: address });
        setIsSearchLocationDaumOpen(false);
        back();
      },
      theme: themeObj,
      width,
    }).embed(daumLocationSearchRef.current);
  }, [back, height, width, setLocation, setIsSearchLocationDaumOpen]);
  return (
    <Box>
      <Box cursor="pointer" px="16" py="20" width="fit" onClick={handleBack}>
        <Icon name="arrow-left" />
      </Box>
      <div ref={daumLocationSearchRef} />
    </Box>
  );
};
