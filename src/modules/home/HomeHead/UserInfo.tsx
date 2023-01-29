import Image from "next/image";

import SSRSafeSuspense from "src/components/AsyncBoundary/SSRSuspense";
import { useMyProfileQuery } from "src/graphql";
import { Box } from "src/ui/Box";
import { Skeleton } from "src/ui/Skeleton";
import { Typography } from "src/ui/Typography";

import userInfoImage from "./userInfoImage.png";

const UserProfile = () => {
  const { data } = useMyProfileQuery();
  return (
    <Box as="span" gap="8">
      <Typography fontSize="headline4">
        {data?.myProfile.nickname},{"\n"}오늘도 아껴보실거죠?
      </Typography>
      <Typography as="span" fontSize="body3-m">
        지금까지 총{" "}
        <Typography as="strong" color="orange2" fontSize="body3-m">
          {data?.myEndDealCount}
        </Typography>
        원 아꼈어요.
      </Typography>
    </Box>
  );
};

const UserInfo = () => (
  <Box direction="row" gap="16" justify="space-between" px="16">
    <SSRSafeSuspense
      fallback={
        <Box gap="8">
          <Box gap="4">
            <Skeleton height="24" width="128" />
            <Skeleton height="24" width="128" />
          </Box>
          <Skeleton height="16" width="64" />
        </Box>
      }
    >
      <UserProfile />
    </SSRSafeSuspense>
    <Box aria-hidden="true" as="span">
      <Image priority alt="" height={82} src={userInfoImage} width={106} />
    </Box>
  </Box>
);

export default UserInfo;
