import { ReactNode } from "react";

import { Typography, Avatar, Box } from "src/ui";
import { SvgIconKey } from "src/ui/Icon/iconMap";

interface LabelContentProps {
  alt?: string;
  children: ReactNode;
  iconName?: SvgIconKey;
  label?: string;
}

export const LabelContent = ({
  label,
  alt,
  iconName,
  children,
}: LabelContentProps) => (
  <Box gap="8">
    <Typography color="orange2" fontSize="body1-b">
      {label}
    </Typography>
    <Box alignItems="center" flexDirection="row" gap="16">
      {iconName && <Avatar alt={alt} iconNmae={iconName} size="48" />}
      <Box>{children}</Box>
    </Box>
  </Box>
);
