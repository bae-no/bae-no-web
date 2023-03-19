import { useReastorageActions } from "@reastorage/react";
import { useRouter } from "next/router";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { ConfirmLocationInMap } from "src/modules/SearchLocation/DetailLocation/ConfirmLocationInMap";
import { DetailLocationInputBox } from "src/modules/SearchLocation/DetailLocation/DetailLocationInputBox";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";

import { createChatFormStorage } from "./storage";

const SubmitButton = () => {
  const { handleSubmit, watch } = useFormContext();
  const { addressDetail } = watch();
  const router = useRouter();

  const { setShareZone } = useReastorageActions(createChatFormStorage);

  const handleFormSubmit = handleSubmit((data) => {
    setShareZone(data);
    router.push("/chat/create/confirm");
  });

  return (
    <Box bottom="48" left="0" position="fixed" px="16" width="full">
      <Button disabled={!addressDetail} size="l" onClick={handleFormSubmit}>
        다음
      </Button>
    </Box>
  );
};

const DetailLocationForm = () => {
  const form = useForm();

  return (
    <Box gap="16">
      <FormProvider {...form}>
        <DetailLocationInputBox />
        <SubmitButton />
      </FormProvider>
      <ConfirmLocationInMap />
    </Box>
  );
};

export default DetailLocationForm;
