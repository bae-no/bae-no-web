import { useSetReastorage } from "@reastorage/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import {
  AddressSystem,
  AddressType,
  useAppendAddressMutation,
  useUserAddressQuery,
} from "src/graphql";
import { ConfirmLocationInMap } from "src/modules/SearchLocation/DetailLocation/ConfirmLocationInMap";
import { DetailLocationFormButton } from "src/modules/SearchLocation/DetailLocation/DetailLocationFormButton";
import { DetailLocationInputBox } from "src/modules/SearchLocation/DetailLocation/DetailLocationInputBox";
import { EnrollParams } from "src/modules/SearchLocation/DetailLocation/detailLocationType";
import { LocationTypeRadioBox } from "src/modules/SearchLocation/DetailLocation/LocationTypeRadioBox";
import { locationStorage, positionStorage } from "src/store/login";
import {
  currentShareZoneStorage,
  showShareZoneTooltipStorage,
} from "src/store/shareZone";
import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";

const ALIAS_PRESET_MAP = {
  [AddressType.Home]: "우리집",
  [AddressType.Work]: "회사",
} as const;

const AddLocation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useAppendAddressMutation();

  const setCurrentShareZone = useSetReastorage(currentShareZoneStorage);
  const setShowShareZoneTooltip = useSetReastorage(showShareZoneTooltipStorage);

  const form = useForm<EnrollParams>();
  const handleSubmit = form.handleSubmit((data) => {
    const location = locationStorage.get();
    const position = positionStorage.get();
    const { addressAlias, addressType, addressDetail } = data;
    const { Jibun, Road } = AddressSystem;

    const address = {
      alias:
        addressAlias ||
        ALIAS_PRESET_MAP[addressType as keyof typeof ALIAS_PRESET_MAP],
      coordinate: position,
      detail: addressDetail,
      path: location.roadAddress || location.jibunAddress,
      system: location.roadAddress ? Road : Jibun,
      type: addressType,
    };
    mutate(
      {
        input: address,
      },
      {
        onSuccess: () => {
          setCurrentShareZone(address);
          queryClient.invalidateQueries(useUserAddressQuery.getKey());
          router.back();
          setShowShareZoneTooltip(true);
        },
      },
    );
  });
  return (
    <Layout
      headerProps={{
        leftNode: <Header.Back />,
        title: "주소 상세 정보 입력",
      }}
    >
      <FormProvider {...form}>
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
            <LocationTypeRadioBox />
            <ConfirmLocationInMap />
          </Box>
          <DetailLocationFormButton isLoading={false} />
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default AddLocation;
