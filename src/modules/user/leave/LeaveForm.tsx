import { useRouter } from "next/router";
import { FormProvider, useController, useWatch } from "react-hook-form";

import { LeaveReasonType, useLeaveMutation } from "src/graphql";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";
import { Popup } from "src/ui/Popup";
import { Select } from "src/ui/Select";
import { TextArea } from "src/ui/TextArea";
import { setCookie } from "src/utils/cookie";

import { useLeaveForm, useLeaveFormContext } from "./useLeaveForm";

const NameField = () => {
  const { register } = useLeaveFormContext();
  return (
    <FormField label="이름">
      <Input
        {...register("name", { required: true })}
        placeholder="실명확인을 위해 이름을 적어주세요."
      />
    </FormField>
  );
};

const LeaveTypeField = () => {
  const { setValue, control } = useLeaveFormContext();
  const { field } = useController({
    control,
    name: "type",
    rules: { required: true },
  });
  return (
    <FormField label="탈퇴사유">
      <Select
        options={[
          {
            label: "정보 공유하는 사람이 적기 때문에",
            value: LeaveReasonType.UserCount,
          },
          {
            label: "인원 모이는 장소가 비효율적이기 때문에",
            value: LeaveReasonType.Place,
          },
          {
            label: "생각보다 가격이 비효율적이기 때문에",
            value: LeaveReasonType.Price,
          },
          {
            label: "직접입력",
            value: LeaveReasonType.Etc,
          },
        ]}
        placeholder="탈퇴사유를 선택해주세요."
        placeholderColor="black5"
        showArrow={false}
        title="탈퇴사유"
        onValueChange={(value) => setValue("type", value as LeaveReasonType)}
        {...field}
      />
    </FormField>
  );
};

const BodyField = () => {
  const { control } = useLeaveFormContext();
  const { type } = useWatch({ control });
  const { field } = useController({ control, name: "body" });
  if (type !== LeaveReasonType.Etc) return null;

  return (
    <TextArea
      maxLength={80}
      value={field.value ?? ""}
      onChange={field.onChange}
    />
  );
};

const SubmitButton = () => {
  const { handleSubmit, watch } = useLeaveFormContext();
  const router = useRouter();
  const { mutate } = useLeaveMutation({
    onSuccess: () => {
      setCookie("token", "", {
        path: "/",
      });
      router.push("/login");
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    mutate({ input: data });
  });

  const { name, type } = watch();
  return (
    <Popup
      cancelText="취소"
      confirmText="탈퇴하기"
      description="배달비노노를 정말로 떠나실건가요?"
      title="탈퇴하기"
      onConfirm={handleFormSubmit}
    >
      <Box bottom="48" left="0" position="fixed" px="16" width="full">
        <Button
          disabled={[name, type].some((value) => !value)}
          size="l"
          type="button"
        >
          탈퇴하기
        </Button>
      </Box>
    </Popup>
  );
};

const LeaveForm = () => {
  const form = useLeaveForm({ mode: "onChange" });
  return (
    <FormProvider {...form}>
      <Box as="form" gap="16">
        <NameField />
        <LeaveTypeField />
        <BodyField />
        <SubmitButton />
      </Box>
    </FormProvider>
  );
};

export default LeaveForm;
