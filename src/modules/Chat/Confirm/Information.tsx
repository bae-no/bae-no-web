import { ReactNode } from "react";

import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

const InformationItem = ({
  label,
  value,
  affix,
}: {
  affix?: string;
  label: string;
  value: string;
}) => (
  <Box direction="row" gap="8">
    <Typography color="black2" fontSize="body2-b">
      {label}
    </Typography>
    <Typography color="black3" fontSize="body2-m">
      {value}
      {affix}
    </Typography>
  </Box>
);

const Information = ({
  title,
  children,
}: {
  children: ReactNode;
  title: string;
}) => (
  <Box gap="12">
    <Typography fontSize="headline5">{title}</Typography>
    <Box gap="12">{children}</Box>
  </Box>
);

Information.Item = InformationItem;

export default Information;
