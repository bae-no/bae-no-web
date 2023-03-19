import { useEffect } from "react";

import { useReastorageActions, useReastorageValue } from "@reastorage/react";

import { AddressSystem } from "src/graphql";
import { useMounted } from "src/hooks/useMounted";
import DetailLocationForm from "src/modules/Chat/CreateForm/DetailLocationForm";
import { createChatFormStorage } from "src/modules/Chat/CreateForm/storage";
import { locationStorage, positionStorage } from "src/store/login";
import { recentlySearchedShareZonesStorage } from "src/store/shareZone";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";

const SetShareZone = () => {
  const location = useReastorageValue(locationStorage);
  const position = useReastorageValue(positionStorage);

  const { setShareZone } = useReastorageActions(createChatFormStorage);
  const recentlySearchedShareZonesActions = useReastorageActions(
    recentlySearchedShareZonesStorage,
  );
  const isMounted = useMounted();

  useEffect(() => {
    if (!isMounted) return;
    const shareZone = {
      ...position,
      addressPath: location.roadAddress || location.jibunAddress || "",
      addressSystem: location.jibunAddress
        ? AddressSystem.Jibun
        : AddressSystem.Road,
    };

    recentlySearchedShareZonesActions.add("chat", shareZone);

    setShareZone(shareZone);
  }, [
    location,
    position,
    setShareZone,
    recentlySearchedShareZonesActions,
    isMounted,
  ]);
  return null;
};

const LocationDetailPage = () => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
      title: "주소 상세 정보 입력",
    }}
  >
    <>
      <SetShareZone />
      <Container marginTop="32">
        <DetailLocationForm />
      </Container>
    </>
  </Layout>
);

export default LocationDetailPage;
