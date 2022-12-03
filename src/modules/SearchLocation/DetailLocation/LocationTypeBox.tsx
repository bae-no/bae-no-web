import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

import { locationTypeBoxSizeCss } from "./locationTypeBox.css";

const typeObject = {
  ETC: {
    name: "location",
    title: "기타",
  },
  HOME: {
    name: "home-outline",
    title: "우리집",
  },
  WORK: {
    name: "buliding",
    title: "회사",
  },
} as const;

interface LocationTypeBoxProps {
  isSelect: boolean;
  onClick: () => void;
  type: "HOME" | "WORK" | "ETC";
}

export const LocationTypeBox = ({
  isSelect,
  type,
  onClick,
}: LocationTypeBoxProps) => {
  const color = isSelect ? "orange2" : "black5";
  const { name, title } = typeObject[type];

  return (
    <Box
      alignItems="center"
      borderColor={color}
      borderStyle="solid"
      borderWidth="2"
      br="8"
      className={locationTypeBoxSizeCss}
      cursor="pointer"
      justifyContent="center"
      onClick={onClick}
    >
      <Box alignItems="center" gap="4">
        <Icon color={color} name={name} />
        <Typography color={color} fontSize="body2-b">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
