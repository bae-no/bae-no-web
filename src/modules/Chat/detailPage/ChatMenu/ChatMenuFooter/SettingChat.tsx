import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

export const SettingChat = () => {
  const a = "a";

  return (
    <Box as="button" flexDirection="row" gap="8">
      <Icon name="setting" />
      <Typography color="black2" fontSize="body2-m">
        채팅방 설정
      </Typography>
    </Box>
  );
};
