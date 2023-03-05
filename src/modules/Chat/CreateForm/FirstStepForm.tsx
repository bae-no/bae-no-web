import { ComponentProps } from "react";

import { useReastorageValue, useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";
import { FormProvider, RegisterOptions, useController } from "react-hook-form";

import { FoodCategory, useCategoryListQuery } from "src/graphql";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";
import { Select } from "src/ui/Select";

import {
  CreateChatForm as CreateChatFormType,
  createChatFormStorage,
} from "./storage";
import {
  useCreateChatForm,
  useCreateChatFormContext,
} from "./useCreateChatForm";

interface FieldProps {
  fieldName: keyof CreateChatFormType;
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
  const { register } = useCreateChatFormContext();
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

const CategoryField = () => {
  const { setValue, control } = useCreateChatFormContext();
  const { data } = useCategoryListQuery({}, { suspense: false });
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

const NumberFieldWithPrefix = ({
  fieldName,
  label,
  placeholder,
  inputProps,
  options,
  prefix,
}: FieldProps & { prefix: string }) => {
  const { control } = useCreateChatFormContext();
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
          field.value !== undefined ? String(field.value) + prefix : field.value
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
  const { handleSubmit, watch } = useCreateChatFormContext();
  const fields = watch();
  const setCreateChatFormAtom = useSetReastorage(createChatFormStorage);

  const router = useRouter();

  const handleFormSubmit = handleSubmit((data) => {
    setCreateChatFormAtom(data);
    router.push("/chat/create/location");
  });

  return (
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
  );
};

export const CreateChatFirstStepForm = () => {
  const formValues = useReastorageValue(createChatFormStorage);
  const form = useCreateChatForm({
    defaultValues: formValues,
    mode: "onChange",
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
          fieldName="maxParticipant"
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
