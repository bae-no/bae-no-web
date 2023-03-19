import { useEffect } from "react";

import { useReastorageActions, useReastorageValue } from "@reastorage/react";

import DetailLocationForm from "src/modules/Chat/CreateForm/DetailLocationForm";
import { createChatFormStorage } from "src/modules/Chat/CreateForm/storage";
import { locationStorage, positionStorage } from "src/store/login";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";

const SetShareZone = () => {
  const location = useReastorageValue(locationStorage);
  const position = useReastorageValue(positionStorage);
  const { setShareZone } = useReastorageActions(createChatFormStorage);

  useEffect(() => {
    setShareZone({ ...location, ...position });
  }, [location, position, setShareZone]);
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
