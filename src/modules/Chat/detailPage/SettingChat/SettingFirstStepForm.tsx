import { ComponentProps } from "react";

import { useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";
import {
  FormProvider,
  RegisterOptions,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

import {
  FoodCategory,
  GetShareDeal,
  UpdateShareDealInput,
  useCategoryListQuery,
  useGetShareDeal,
} from "src/graphql";
import { locationStorage } from "src/store/login";
import { updateShareDealStorage } from "src/store/updateShareDeal";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";
import { Select } from "src/ui/Select";

import { getRandomIndex } from "../../Confirm/Thumnail";

interface FieldProps {
  fieldName: keyof UpdateShareDealInput;
  inputProps?: ComponentProps<typeof Input>;
  label: string;
  options?: RegisterOptions;
  placeholder: string;
}

const Field = ({
  fieldName,
  label,
  placeholder,
  inputProps,
  options,
}: FieldProps) => {
  const { register } = useFormContext();

  return (
    <FormField label={label}>
      <Input
        {...register(fieldName, { required: true, ...options })}
        placeholder={placeholder}
        {...inputProps}
      />
    </FormField>
  );
};

const NumberFieldWithPrefix = ({
  fieldName,
  label,
  placeholder,
  inputProps,
  options,
  prefix,
}: FieldProps & { prefix: string }) => {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: fieldName,
    rules: { required: true, ...options },
  });
  return (
    <FormField label={label}>
      <Input
        placeholder={placeholder}
        {...field}
        {...inputProps}
        value={
          field.value !== undefined
            ? String(field.value) + prefix
            : field.value ?? ""
        }
        onChange={(e) => {
          const { value } = e.target;
          const number = Number(value.replace(prefix, ""));
          field.onChange(number);
        }}
      />
    </FormField>
  );
};

const SubmitButton = () => {
  const { handleSubmit, watch } = useFormContext<GetShareDeal["shareDeal"]>();
  const router = useRouter();
  const fields = watch();
  const setUpdateShareDealInfo = useSetReastorage(updateShareDealStorage);
  const setLocation = useSetReastorage(locationStorage);
  const handleFormSubmit = handleSubmit((data) => {
    const {
      detail: addressDetail,
      path: addressPath,
      system: addressSystem,
      coordinate,
    } = data.shareZone;

    const { latitude, longitude } = coordinate;

    setUpdateShareDealInfo({
      ...data,
      id: router.query.id as string,
      maxParticipant: data.maxParticipants,
      shareZone: {
        addressDetail,
        addressPath,
        addressSystem,
        latitude,
        longitude,
      },
      thumbnail: `/images/food/${data.category
        ?.toLocaleLowerCase()
        .replace("_", "")}${getRandomIndex()}.png`,
    });

    setLocation((prev) => ({
      ...prev,
      [addressSystem === "JIBUN" ? "jibunAddress" : "roadAddress"]: addressPath,
    }));
    router.push({
      pathname: "/chat/[id]/setting/location-detail",
      query: { id: router.query.id },
    });
  });

  return (
    <Box height="128">
      <Box bottom="48" left="0" position="fixed" px="16" width="full">
        <Button
          disabled={Object.values(fields).some((value) => !value)}
          size="l"
          type="button"
          onClick={handleFormSubmit}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
};

const CategoryField = () => {
  const { setValue, control } = useFormContext();
  const { data } = useCategoryListQuery(undefined, {
    enabled: false,
    suspense: false,
  });

  const { field } = useController({
    control,
    name: "category",
    rules: { required: true },
  });

  return (
    <FormField label="카테고리">
      <Select
        options={
          data?.categories.foodCatalog.map((category) => ({
            label: category.name,
            value: category.code,
          })) ?? []
        }
        placeholder="카테고리 선택"
        placeholderColor="black5"
        title="카테고리"
        onValueChange={(value) => setValue("category", value as FoodCategory)}
        {...field}
      />
    </FormField>
  );
};

export const SettingFirstStepForm = () => {
  const router = useRouter();
  const { data } = useGetShareDeal({
    shareDealId: router.query.id as string,
  });

  const form = useForm({
    defaultValues: data?.shareDeal,
  });

  return (
    <FormProvider {...form}>
      <Box as="form" gap="16">
        <Field
          fieldName="title"
          label="채팅방 이름"
          placeholder="사용하실 채팅방 이름을 입력해주세요."
        />
        <CategoryField />
        <Field
          fieldName="storeName"
          label="주문할 가게 이름"
          placeholder="주문하실 가게 이름을 입력해주세요."
        />
        <NumberFieldWithPrefix
          fieldName="maxParticipants"
          inputProps={{ prefix: "명" }}
          label="최대 참여 인원"
          options={{ min: 0 }}
          placeholder="0"
          prefix="명"
        />
        <NumberFieldWithPrefix
          fieldName="orderPrice"
          label="배달비 금액"
          placeholder="공유할 배달비 금액을 입력해주세요."
          prefix="원"
        />
        <SubmitButton />
      </Box>
    </FormProvider>
  );
};
