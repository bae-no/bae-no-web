import { useEffect } from "react";

import { useReastorageValue } from "@reastorage/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import {
  AddressSystem,
  AddressType,
  useEnrollUserLocationNickname,
} from "src/graphql";
import { DetailLocationHeader } from "src/modules/SearchLocation/DetailLocation/DetailLocationHeader";
import { DetailLocationInputBox } from "src/modules/SearchLocation/DetailLocation/DetailLocationInputBox";
import { EnrollParams } from "src/modules/SearchLocation/DetailLocation/detailLocationType";
import { LocationTypeBox } from "src/modules/SearchLocation/DetailLocation/LocationTypeBox";
import { locationStorage } from "src/store/location";
import { nickNameStorage } from "src/store/nickName";
import { positionStorage } from "src/store/position";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

const DetailLocation = () => {
  const router = useRouter();
  const location = useReastorageValue(locationStorage);
  const position = useReastorageValue(positionStorage);
  const nickname = useReastorageValue(nickNameStorage);

  const { latitude, longitude } = position;

  const methods = useForm<EnrollParams>();

  const { setValue, watch, register, getValues, reset, resetField } = methods;
  const { Etc, Home, Work } = AddressType;
  const addressType = watch("address.type");
  const { mutate, isSuccess, isLoading } = useEnrollUserLocationNickname();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
    reset({
      address: {
        coordinate: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        path: location.roadAddress ?? location.jibunAddress,
        system: location.roadAddress ? AddressSystem.Road : AddressSystem.Jibun,
      },
      nickname,
    });
  }, [
    isSuccess,
    latitude,
    location.jibunAddress,
    location.roadAddress,
    longitude,
    nickname,
    reset,
    router,
  ]);

  const handleButtonClick = () => {
    const { coordinate, detail, path, system, type, alias } =
      getValues().address;
    mutate({
      input: {
        address: {
          alias,
          coordinate,
          detail,
          path,
          system,
          type,
        },
        nickname,
      },
    });
  };

  const getButtonDisabled = () => {
    if (isLoading) return true;
    if (
      watch("address.coordinate.latitude") &&
      watch("address.coordinate.longitude") &&
      watch("address.detail") &&
      addressType &&
      watch("address.path") &&
      watch("address.system")
    ) {
      if (addressType === Etc && !watch("address.alias")) return true;
      return false;
    }
    return true;
  };

  const handleTypeBoxClick = (type: AddressType) => {
    setValue("address.type", type);
    setValue("address.alias", "");
  };

  return (
    <FormProvider {...methods}>
      <Box
        height="full"
        justifyContent="space-between"
        marginBottom="48"
        px="16"
      >
        <Box gap="24">
          <Box gap="32">
            <DetailLocationHeader />
            <DetailLocationInputBox />
          </Box>
          <Box gap="16">
            <Box flexDirection="row" justifyContent="space-between">
              {[Home, Work, Etc].map((type) => (
                <LocationTypeBox
                  isSelect={addressType === type}
                  key={type}
                  type={type}
                  onClick={() => handleTypeBoxClick(type)}
                />
              ))}
            </Box>
            {addressType === Etc && (
              <Input
                placeholder="주소 별명"
                variant="underline"
                onClearClick={() => resetField("address.alias")}
                {...register("address.alias")}
              />
            )}
          </Box>
          <Box
            alignItems="center"
            cursor="pointer"
            flexDirection="row"
            gap="12"
            justifyContent="space-between"
            onClick={() => {
              router.push({
                pathname: "/search-location/SearchLocationMap",
                query: {
                  nextUrl:
                    "http://localhost:3000/search-location/detailLocation",
                },
              });
            }}
          >
            <Box flexDirection="row" gap="8">
              <Icon name="map" />
              <Typography color="black2" fontSize="body1-m">
                또는 현재 위치로 설정
              </Typography>
            </Box>
            <Icon name="arrow-right" size="24" />
          </Box>
        </Box>
        <Button disabled={getButtonDisabled()} onClick={handleButtonClick}>
          확인
        </Button>
      </Box>
    </FormProvider>
  );
};
export default DetailLocation;
