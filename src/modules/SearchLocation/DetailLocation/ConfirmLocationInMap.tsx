import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

export const ConfirmLocationInMap = () => {
  const router = useRouter();

  return (
    <Box
      alignItems="center"
      as="button"
      cursor="pointer"
      flexDirection="row"
      gap="12"
      justifyContent="space-between"
      onClick={() => {
        router.push({
          pathname: "/search-location/SearchLocationMap",
          query: {
            nextUrl: "http://localhost:3000/search-location/detailLocation",
          },
        });
      }}
    >
      <Box flexDirection="row" gap="8">
        <Icon name="map" />
        <Typography color="black2" fontSize="body1-m">
          지도에서 위치 확인
        </Typography>
      </Box>
      <Icon name="arrow-right" size="24" />
    </Box>
  );
};
