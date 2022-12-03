import { useRouter } from "next/router";
import { FormProvider, useForm, useFormState } from "react-hook-form";

import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";

import Category from "./fields/Category";
import MinParticipants from "./fields/MinParticipants";
import OrderPrice from "./fields/OrderPrice";
import StoreName from "./fields/StoreName";
import Title from "./fields/Title";
import { useCreateChatFormContext } from "./hooks";

const SubmitButton = () => {
  const { control, handleSubmit } = useCreateChatFormContext();
  const { isValid } = useFormState({ control });

  const router = useRouter();

  return (
    <Button
      disabled={!isValid}
      type="submit"
      onClick={handleSubmit((data) => {
        router.push({
          href: "/chat/create/address",
          query: data,
        });
      })}
    >
      다음
    </Button>
  );
};

const CreateChat = () => {
  const form = useForm({
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <Box
        gap="56"
        height="full"
        justify="space-between"
        marginBottom="48"
        mx="16"
      >
        <Box marginTop="32">
          <Typography as="h1" fontSize="headline2">
            만드실 공유딜에 대한{"\n"}
            정보를 입력해주세요.
          </Typography>
          <Box gap="16" marginTop="32">
            <Title />
            <Category />
            <StoreName />
            <MinParticipants />
            <OrderPrice />
          </Box>
        </Box>
        <SubmitButton />
      </Box>
    </FormProvider>
  );
};

export default CreateChat;
