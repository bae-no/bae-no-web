import { ReactNode } from "react";

import { Box } from "src/ui/Box";
import { Header, Layout } from "src/ui/Layout";
import { Toggle } from "src/ui/Toggle";
import { Typography } from "src/ui/Typography";

interface SectionProps {
  children: ReactNode;
  title: string;
}

const Section = ({ title, children }: SectionProps) => (
  <Box gap="8">
    <Typography color="black4" fontSize="caption1-m">
      {title}
    </Typography>
    {children}
  </Box>
);

interface SectionItemProps {
  desc: string;
  title: string;
}

const SectionItem = ({ title, desc }: SectionItemProps) => (
  <Box align="center" direction="row" justify="space-between">
    <Box gap="4">
      <Typography as="strong" color="black2" fontSize="body1-m">
        {title}
      </Typography>
      <Typography as="span" color="black5" fontSize="caption1-m">
        {desc}
      </Typography>
    </Box>
    <Toggle />
  </Box>
);

const SettingPage = () => (
  <Layout
    headerProps={{
      leftNode: <Header.Back />,
      title: "설정",
    }}
  >
    <Box gap="32" p="16" paddingTop="32">
      <Section title="푸시 알림">
        <SectionItem
          desc="공지와 서비스 관련된 알림을 수신합니다"
          title="공지 및 업데이트 알림"
        />
        <SectionItem
          desc="채팅방에서의 메시지 알림을 수신합니다"
          title="채팅방 알림"
        />
        <SectionItem
          desc="공유딜의 시작, 완료, 파기에 대한 알림을 수신합니다"
          title="공유딜 알림"
        />
      </Section>
      <Section title="광고 및 마케팅 수신 알림">
        <SectionItem
          desc="광고 및 마케팅성 메시지 알림을 수신합니다"
          title="광고 및 마케팅 알림"
        />
      </Section>
    </Box>
  </Layout>
);

export default SettingPage;
