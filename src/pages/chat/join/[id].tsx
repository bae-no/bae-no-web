import { useMemo, useState } from "react";

import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Script from "next/script";

import { useGetShareDeal, useJoinShareDeal } from "src/graphql";
import useCurrentLocation from "src/hooks/useCurrentLocation";
import Information from "src/modules/Chat/Confirm/Information";
import ConfirmMap from "src/modules/Chat/Confirm/Map";
import Thumnail from "src/modules/Chat/Confirm/Thumnail";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Container } from "src/ui/Container";
import Divider from "src/ui/Divider";
import { Header } from "src/ui/Layout";
import { getDistanceFromCoordinates } from "src/utils/getDistanceFromCoordinates";
import { prefetchQueriesOnServerSideWithAuth } from "src/utils/prefetchQueryOnServerSide";

const JoinChatPage = () => {
  const [isNaverMapReady, setIsNaverMapReady] = useState(false);
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };

  const { mutate } = useJoinShareDeal({
    onSuccess: () => {
      router.replace({
        pathname: "/chat/[id]",
        query: {
          id,
        },
      });
    },
  });
  const { data } = useGetShareDeal({
    shareDealId: id,
  });
  const location = useCurrentLocation();
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const { category, maxParticipants, orderPrice, shareZone, storeName, title } =
    data?.shareDeal || {};
  const { coordinate, detail, path } = shareZone || {};

  const distance = useMemo(() => {
    if (!location || !coordinate) return null;
    return getDistanceFromCoordinates(location, coordinate);
  }, [coordinate, location]);

  const handleSubmit = () => {
    mutate({
      input: {
        shareDealId: id,
      },
    });
  };

  return (
    <Box gap="24">
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onReady={() => setIsNaverMapReady(true)}
      />
      <Box position="relative" width="full">
        <Box left="16" position="absolute" top="16" zIndex={1}>
          <Header.Back />
        </Box>
        <Thumnail
          category={category}
          setThumbnailUrl={setThumbnailUrl}
          thumbnailUrl={thumbnailUrl}
        />
      </Box>
      <Container>
        <Information title={title ?? ""}>
          <Information.Item
            affix="명"
            label="공유인원"
            value={String(maxParticipants)}
          />
          <Information.Item label="카테고리" value={category ?? ""} />
          <Information.Item label="주문할 가게" value={storeName ?? ""} />
          <Information.Item
            affix="원"
            label="배달비"
            value={String(orderPrice)}
          />
        </Information>
        <Divider backgroundColor="black7" height="1" my="24" width="full" />
        <Information title="공유존 정보">
          <Information.Item
            label="거리"
            value={
              Number.isNaN(distance) ? "계산중..." : `${String(distance)}km`
            }
          />
          <Information.Item label="주소" value={`${path} ${detail}`} />
          <Script
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID}&submodules=geocoder`}
            strategy="afterInteractive"
            onReady={() => setIsNaverMapReady(true)}
          />
          {!!isNaverMapReady && (
            <ConfirmMap center={coordinate ?? { latitude: 0, longitude: 0 }} />
          )}
        </Information>
      </Container>
      <Box height="128">
        <Box
          backgroundColor="white"
          bottom="0"
          left="0"
          paddingBottom="48"
          position="fixed"
          px="16"
          width="full"
          zIndex={100}
        >
          <Button size="l" type="button" onClick={handleSubmit}>
            참여하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinChatPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query as { [key: string]: string };

  return prefetchQueriesOnServerSideWithAuth([
    {
      getParams: () => ({ variables: { shareDealId: id } }),
      queryHook: useGetShareDeal,
    },
  ])(context);
};
