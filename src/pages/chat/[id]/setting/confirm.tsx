import { useMemo, useState } from "react";

import { useReastorageValue } from "@reastorage/react";
import { useRouter } from "next/router";
import Script from "next/script";

import { useUpdateShareDeal } from "src/graphql";
import useCurrentLocation from "src/hooks/useCurrentLocation";
import Information from "src/modules/Chat/Confirm/Information";
import ConfirmMap from "src/modules/Chat/Confirm/Map";
import Thumnail from "src/modules/Chat/Confirm/Thumnail";
import { updateShareDealStorage } from "src/store/updateShareDeal";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Container } from "src/ui/Container";
import Divider from "src/ui/Divider";
import { Header } from "src/ui/Layout";
import { getDistanceFromCoordinates } from "src/utils/getDistanceFromCoordinates";

const SettingShareDealConfirmPage = () => {
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  const shareDealData = useReastorageValue(updateShareDealStorage);
  const {
    category,
    maxParticipant,
    orderPrice,
    shareZone,
    storeName,
    thumbnail,
    title,
  } = shareDealData || {};

  const { addressDetail, addressPath, latitude, longitude } = shareZone || {};

  const location = useCurrentLocation();
  const [isNaverMapReady, setIsNaverMapReady] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnail);

  const { mutate } = useUpdateShareDeal({
    onSuccess: () =>
      router.push({
        pathname: "/chat/[id]",
        query: {
          id,
          title,
        },
      }),
  });

  const distance = useMemo(() => {
    if (!location || !latitude || !longitude) return null;
    return getDistanceFromCoordinates(location, { latitude, longitude });
  }, [latitude, location, longitude]);

  const handleSubmit = () => {
    mutate({
      input: {
        category,
        id,
        maxParticipant,
        orderPrice,
        shareZone,
        storeName,
        thumbnail,
        title,
      },
    });
  };

  if (!shareDealData) return null;

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
            value={String(maxParticipant)}
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
          <Information.Item
            label="주소"
            value={`${addressPath} ${addressDetail}`}
          />
          <Script
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_DEVELOPMENT_NAVER_CLIENT_ID}&submodules=geocoder`}
            strategy="afterInteractive"
            onReady={() => setIsNaverMapReady(true)}
          />
          {!!isNaverMapReady && (
            <ConfirmMap
              center={{ latitude, longitude } ?? { latitude: 0, longitude: 0 }}
            />
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
            수정 완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingShareDealConfirmPage;
