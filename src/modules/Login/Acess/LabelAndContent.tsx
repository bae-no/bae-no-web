import { ReactNode } from "react";

import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { SvgIconKey } from "src/ui/Icon/iconMap";
import { Typography } from "src/ui/Typography";

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
    <Typography as="h2" color="orange2" fontSize="body1-b">
      {label}
    </Typography>
    <Box alignItems="center" flexDirection="row" gap="16">
      {iconName && <Avatar alt={alt} iconName={iconName} size="48" />}
      {children}
    </Box>
  </Box>
);
