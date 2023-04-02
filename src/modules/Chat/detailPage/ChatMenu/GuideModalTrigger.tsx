import { useContext } from "react";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

import { MenuLayoutContext } from "./MenuLayout";

export const GuideTrigger = () => {
  const { setAnimationOn, setOpen, toggleGuide } =
    useContext(MenuLayoutContext);
  const handleTriggerClick = () => {
    setAnimationOn(false);
    setOpen(false);
    toggleGuide();
  };

  return (
    <Box
      alignItems="center"
      cursor="pointer"
      flexDirection="row"
      justifyContent="space-between"
      py="24"
      width="full"
      onClick={handleTriggerClick}
    >
      <Typography fontSize="body2-b">공유딜 이용 가이드</Typography>
      <Icon name="arrow-right" size="12" />
    </Box>
  );
};
