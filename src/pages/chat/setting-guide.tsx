import { EndDealDescription } from "src/modules/Chat/ChatSettingGuide/EndDealDescription";
import { GuideTitle } from "src/modules/Chat/ChatSettingGuide/GuideTitle";
import { StartDealDescription } from "src/modules/Chat/ChatSettingGuide/StartDealDescription";
import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";

const SettingGuide = () => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
    }}
  >
    <Box gap="16" justifyContent="center" px="16">
      <GuideTitle />
      <Box gap="32">
        <StartDealDescription />
        <EndDealDescription />
      </Box>
    </Box>
  </Layout>
);

export default SettingGuide;
