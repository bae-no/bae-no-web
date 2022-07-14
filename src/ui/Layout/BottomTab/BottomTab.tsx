import Link from "next/link";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

import {
  addIconCss,
  bottomTabContainerCss,
  bottomTabCss,
} from "./BottomTab.css";
import BottomTabItem from "./BottomTabItem";

const BottomTab = () => (
  <Box as="nav" className={bottomTabContainerCss}>
    <Box
      backgroundColor="white"
      borderTopRadius="lg"
      className={bottomTabCss}
      flexDirection="row"
      gap="xxs"
      justify="space-between"
      paddingBottom="lg"
      paddingTop="xs"
      position="fixed"
      px="md"
      width="full"
    >
      <BottomTabItem href="/" iconName="home" tabName="홈" />
      <BottomTabItem href="/search" iconName="search" tabName="검색" />
      <Link passHref href="/create-chat">
        <Box as="a" className={addIconCss} position="relative" top="none">
          <Icon name="add" />
        </Box>
      </Link>
      <BottomTabItem href="/chat" iconName="chat" tabName="채팅" />
      <BottomTabItem href="/user" iconName="user" tabName="내 정보" />
    </Box>
  </Box>
);

export default BottomTab;
