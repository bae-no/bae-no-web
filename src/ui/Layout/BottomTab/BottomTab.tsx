import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

import {
  addIconCss,
  bottomTabContainerCss,
  bottomTabCss,
} from "./BottomTab.css";
import BottomTabItem from "./BottomTabItem";

const bottomTabRoutes = ["/", "/search", "/chat/create", "/chat", "/user"];

const BottomTab = () => {
  const router = useRouter();
  useEffect(() => {
    bottomTabRoutes.forEach((route) => router.prefetch(route));
  }, [router]);
  return (
    <Box as="nav" className={bottomTabContainerCss}>
      <Box
        backgroundColor="white"
        borderTopRadius="24"
        bottom="0"
        className={bottomTabCss}
        flexDirection="row"
        gap="4"
        justify="space-between"
        paddingBottom="24"
        paddingTop="8"
        position="fixed"
        px="16"
        width="full"
      >
        <BottomTabItem href="/" iconName="home" tabName="홈" />
        <BottomTabItem href="/search" iconName="search" tabName="검색" />
        <Box
          as={Link}
          className={addIconCss}
          href="/chat/create"
          position="relative"
          title="채팅방 생성"
          top="0"
        >
          <Icon name="add" />
        </Box>
        <BottomTabItem href="/chat" iconName="chat" tabName="채팅" />
        <BottomTabItem href="/user" iconName="user" tabName="내 정보" />
      </Box>
    </Box>
  );
};

export default BottomTab;
