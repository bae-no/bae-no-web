import { useReastorage } from "@reastorage/react";
import dynamic from "next/dynamic";

import {
  HeadWithBackgroundColor,
  useHeaderBackgroundColor,
} from "src/components/HeadWithBackgroundColor";
import MetaTags from "src/components/MetaTags";
import { useHomeStaticQuery, useUserAddressQuery } from "src/graphql";
import ChattingRooms from "src/modules/home/ChattingRooms";
import SearchBar from "src/modules/home/HomeHead/SearchBar";
import UserInfo from "src/modules/home/HomeHead/UserInfo";
import LocationSelector from "src/modules/home/LocationSelector";
import { showShareZoneTooltipStorage } from "src/store/shareZone";
import { Box } from "src/ui/Box";
import { BottomTab, Layout } from "src/ui/Layout";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const Tooltip = dynamic(() => import("src/ui/Tooltip"), { ssr: false });

const Home = () => {
  const [ref, backgroundColor] = useHeaderBackgroundColor();
  const [showTooltip, setShowTooltip] = useReastorage(
    showShareZoneTooltipStorage,
  );

  return (
    <>
      <MetaTags />
      <Layout
        footer={<BottomTab />}
        headerProps={{
          backgroundColor,
          mainNode: (
            <LocationSelector>
              <Tooltip
                open={showTooltip}
                trigger={<LocationSelector.Trigger />}
                onOpenChange={() => setShowTooltip(false)}
              >
                주소가 이곳이 맞나요?
              </Tooltip>
            </LocationSelector>
          ),
          // rightNode: <Header.Notification />, // TODO: 알람기능 추후 출시
        }}
      >
        <Box gap="56">
          <HeadWithBackgroundColor
            css={{ gap: "8", paddingTop: "32" }}
            ref={ref}
          >
            <UserInfo />
            <SearchBar />
          </HeadWithBackgroundColor>
          <ChattingRooms />
        </Box>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = prefetchQueriesOnServerSideWithAuth([
  {
    queryHook: useHomeStaticQuery,
  },
  {
    queryHook: useUserAddressQuery,
  },
]);
