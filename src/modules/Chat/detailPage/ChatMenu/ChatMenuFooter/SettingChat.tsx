import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

export const SettingChat = () => {
  const router = useRouter();

  return (
    <Box
      as="button"
      cursor="pointer"
      flexDirection="row"
      gap="8"
      onClick={() =>
        router.push({
          pathname: "/chat/[id]/setting",
          query: { id: router.query.id },
        })
      }
    >
      <Icon name="setting" />
      <Typography color="black2" fontSize="body2-m">
        채팅방 설정
      </Typography>
    </Box>
  );
};
