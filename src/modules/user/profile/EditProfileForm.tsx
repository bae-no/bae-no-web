import { ChangeEvent } from "react";

import { FormProvider, useController } from "react-hook-form";

import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";
import { formatPhoneNumber } from "src/utils/formatPhoneNumber";

import {
  useEditProfileForm,
  useEditProfileFormContext,
} from "./useEditProfileForm";

const NickNameField = () => {
  const { register } = useEditProfileFormContext();
  return (
    <FormField label="닉네임">
      <Input {...register("nickname")} />
    </FormField>
  );
};

const PhoneNumberField = () => {
  const { control } = useEditProfileFormContext();
  const { field } = useController({ control, name: "phoneNumber" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 13) return;
    const formattedValue = formatPhoneNumber(value);
    field.onChange(formattedValue);
  };
  return (
    <FormField label="핸드폰">
      <Input
        inputMode="numeric"
        maxLength={13}
        {...field}
        onChange={handleChange}
      />
    </FormField>
  );
};

const DescField = () => {
  const { register } = useEditProfileFormContext();
  return (
    <FormField label="자기소개">
      <Input {...register("desc")} />
    </FormField>
  );
};

const EditProfileForm = () => {
  const form = useEditProfileForm({
    defaultValues: {
      desc: "하나 둘 셋넷",
      nickname: "불",
      phoneNumber: "010-5499-9316",
    },
    mode: "onChange",
  });

  const handleSubmit = form.handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <Box as="form" gap="16" width="full" onSubmit={handleSubmit}>
        <NickNameField />
        <PhoneNumberField />
        <DescField />
        <Box bottom="48" left="0" padding="16" position="fixed" width="full">
          <Button type="submit">확인</Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default EditProfileForm;
