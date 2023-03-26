import { FormProvider, useForm } from "react-hook-form";

import { TermsAndConditions } from "src/modules/Login/AgreeTermsAndConditions/modules";
import { TermCheckBoxBox } from "src/modules/Login/AgreeTermsAndConditions/TermCheckBoxBox";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Header, Layout } from "src/ui/Layout";
import { Typography } from "src/ui/Typography";

// TODO: 회원가입 되면 `showShareZoneTooltipStorage` true로 변경

const AgreeTermsAndConditions = () => {
  const method = useForm<TermsAndConditions>();

  return (
    <Box
      height="full"
      justifyContent="space-between"
      marginBottom="48"
      marginTop="32"
      px="16"
    >
      <Box gap="32">
        <Typography color="black2" fontSize="headline2">
          {"마지막으로 약관에 \n동의해주세요."}
        </Typography>
        <FormProvider {...method}>
          <TermCheckBoxBox />
        </FormProvider>
      </Box>
      <Button disabled={!method.formState.isValid}>배달비 노노 시작하기</Button>
    </Box>
  );
};

const AgreeTermsAndConditionsPage = () => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
    }}
  >
    <AgreeTermsAndConditions />
  </Layout>
);

export default AgreeTermsAndConditionsPage;
