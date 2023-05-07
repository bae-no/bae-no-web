import { useReastorageValue, useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { AddressSystem, UpdateShareDealInput } from "src/graphql";
import { ConfirmLocationInMap } from "src/modules/SearchLocation/DetailLocation/ConfirmLocationInMap";
import { DetailLocationInputBox } from "src/modules/SearchLocation/DetailLocation/DetailLocationInputBox";
import { locationStorage, positionStorage } from "src/store/login";
import { updateShareDealStorage } from "src/store/updateShareDeal";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";

const SubmitButton = () => {
  const router = useRouter();
  const { handleSubmit, watch } =
    useFormContext<UpdateShareDealInput["shareZone"]>();

  const setUpdateShareDeal = useSetReastorage(updateShareDealStorage);
  const { jibunAddress, roadAddress } = useReastorageValue(locationStorage);
  const { latitude, longitude } = useReastorageValue(positionStorage);

  const handleFormSubmit = handleSubmit(({ addressDetail }) => {
    setUpdateShareDeal((prev) => ({
      ...prev,
      shareZone: {
        addressDetail,
        addressPath: roadAddress || jibunAddress,
        addressSystem: roadAddress ? AddressSystem.Jibun : AddressSystem.Road,
        latitude,
        longitude,
      },
    }));
    router.push({
      pathname: "/chat/[id]/setting/confirm",
      query: { id: router.query.id },
    });
  });

  return (
    <Box bottom="48" left="0" position="fixed" px="16" width="full">
      <Button
        disabled={!watch("addressDetail")}
        size="l"
        onClick={handleFormSubmit}
      >
        다음
      </Button>
    </Box>
  );
};

const SettingShareDealLocationDetail = () => {
  const form = useForm<
    Pick<UpdateShareDealInput["shareZone"], "addressDetail">
  >({
    defaultValues: async () =>
      new Promise((resolve) => {
        setTimeout(() => {
          const { addressDetail } = updateShareDealStorage.get().shareZone;
          resolve({
            addressDetail,
          });
        }, 10);
      }),
  });
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };

  return (
    <Layout
      headerProps={{
        leftNode: <Header.Back />,
        title: "주소 상세 정보 입력",
      }}
    >
      <Container marginTop="32">
        <Box gap="16">
          <FormProvider {...form}>
            <DetailLocationInputBox />
            <SubmitButton />
          </FormProvider>
          <ConfirmLocationInMap
            nextUrl="/chat/[id]/setting/location-detail"
            query={{ id }}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default SettingShareDealLocationDetail;
