import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import {
  AddressSystem,
  useEnrollUserLocationNicknameMutation,
} from "src/graphql";
import { ConfirmLocationInMap } from "src/modules/SearchLocation/DetailLocation/ConfirmLocationInMap";
import { DetailLocationFormButton } from "src/modules/SearchLocation/DetailLocation/DetailLocationFormButton";
import { DetailLocationInputBox } from "src/modules/SearchLocation/DetailLocation/DetailLocationInputBox";
import { EnrollParams } from "src/modules/SearchLocation/DetailLocation/detailLocationType";
import { LocationTypeBox } from "src/modules/SearchLocation/DetailLocation/LocationTypeBox";
import {
  locationStorage,
  nickNameStorage,
  positionStorage,
} from "src/store/login";
import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";

const DetailLocation = () => {
  const router = useRouter();
  const { mutate, isLoading } = useEnrollUserLocationNicknameMutation({
    onSuccess: () => {
      router.push("/");
    },
  });
  const methods = useForm<EnrollParams>();
  const handleSubmit = methods.handleSubmit((data) => {
    const location = locationStorage.get();
    const nickname = nickNameStorage.get();
    const position = positionStorage.get();
    const { addressAlias, addressType, addressDetail } = data;
    const { Jibun, Road } = AddressSystem;
    mutate({
      input: {
        address: {
          alias: addressAlias,
          coordinate: position,
          detail: addressDetail,
          path: location.roadAddress ?? location.jibunAddress,
          system: location.roadAddress ? Road : Jibun,
          type: addressType,
        },
        nickname,
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        height="full"
        justifyContent="space-between"
        marginBottom="48"
        px="16"
        onSubmit={handleSubmit}
      >
        <Box gap="24">
          <Box gap="32">
            <DetailLocationInputBox />
          </Box>
          <LocationTypeBox />
          <ConfirmLocationInMap />
        </Box>
        <DetailLocationFormButton isLoading={isLoading} />
      </Box>
    </FormProvider>
  );
};

const DetailLocationPage = () => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
      title: "주소 상세 정보 입력",
    }}
  >
    <DetailLocation />
  </Layout>
);
export default DetailLocationPage;
