import { useQueryClient } from "@tanstack/react-query";
import { FormProvider } from "react-hook-form";

import { usePopup } from "src/components/GlobalPopup";
import { useMyProfileQuery, useUpdateProfileMutation } from "src/graphql";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";

import {
  useEditProfileForm,
  useEditProfileFormContext,
} from "./useEditProfileForm";

const NickNameField = () => {
  const { data: myProfileData } = useMyProfileQuery();
  return (
    <FormField label="닉네임">
      <Input disabled defaultValue={myProfileData?.myProfile.nickname} />
    </FormField>
  );
};

const PhoneNumberField = () => {
  const { data: myProfileData } = useMyProfileQuery();

  return (
    <FormField label="핸드폰">
      <Input disabled defaultValue={myProfileData?.myProfile.phoneNumber} />
    </FormField>
  );
};

const IntroduceField = () => {
  const { register, setValue } = useEditProfileFormContext();
  const handleClear = () => setValue("introduce", "");
  return (
    <FormField label="자기소개">
      <Input {...register("introduce")} onClearClick={handleClear} />
    </FormField>
  );
};

const EditProfileForm = () => {
  const { data: myProfileData } = useMyProfileQuery();

  const { openPopup } = usePopup();
  const form = useEditProfileForm({
    defaultValues: myProfileData?.myProfile || {},
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { mutate } = useUpdateProfileMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(useMyProfileQuery.getKey());
      openPopup({
        confirmText: "확인",
        description: "프로필 수정이 완료되었습니다.",
        title: "알림",
      });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    mutate({ input: { introduce: data.introduce } });
  });

  return (
    <FormProvider {...form}>
      <Box
        as="form"
        gap="16"
        marginBottom="128"
        width="full"
        onSubmit={handleSubmit}
      >
        <NickNameField />
        <PhoneNumberField />
        <IntroduceField />
        <Box
          backgroundColor="white"
          bottom="0"
          left="0"
          padding="16"
          paddingBottom="48"
          position="fixed"
          width="full"
        >
          <Button type="submit">확인</Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default EditProfileForm;
