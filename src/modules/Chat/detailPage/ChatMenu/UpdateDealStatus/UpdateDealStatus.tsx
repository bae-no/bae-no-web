import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import { ToggleChip } from "../ToggleChip";

interface UpdateDealStatusProps {
  children: string;
  isActive?: boolean;
}

export const UpdateDealStatus = ({
  children,
  isActive,
}: UpdateDealStatusProps) => (
  <Box
    alignItems="center"
    cursor="pointer"
    flexDirection="row"
    justifyContent="space-between"
    py="8"
  >
    <Typography color="black2" fontSize="body2-m">
      {children}
    </Typography>
    <ToggleChip isActive={isActive} />
  </Box>
);
