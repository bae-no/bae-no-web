import Link from "next/link";
import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

interface BottomTabItemProps {
  href: string;
  iconName: "home" | "chat" | "user" | "search";
  tabName: string;
}

const BottomTabItemItem = ({ iconName, tabName, href }: BottomTabItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const color = isActive ? "orange2" : "black6";
  return (
    <Box replace align="center" as={Link} flex={1} gap="4" href={href}>
      <Icon
        color={color}
        name={`${iconName}-${isActive ? "solid" : "outline"}`}
        size="24"
      />
      <Typography color={color} fontSize="caption1-m">
        {tabName}
      </Typography>
    </Box>
  );
};

export default BottomTabItemItem;
