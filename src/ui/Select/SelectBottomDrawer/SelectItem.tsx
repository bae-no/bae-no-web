import { DialogClose } from "@radix-ui/react-dialog";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

import { SelectItemProps } from "./SelectBottomDrawer.types";

export const SelectItem = ({
  label,
  value,
  onValueChange,
  currentValue,
}: SelectItemProps) => {
  const handleClick = () => {
    onValueChange(value);
  };
  const selected = value === currentValue;

  return (
    <DialogClose asChild>
      <Box
        aria-selected={selected}
        as="button"
        flexDirection="row"
        justifyContent="space-between"
        outline="none"
        px="16"
        py="8"
        role="option"
        onClick={handleClick}
      >
        <Typography color={selected ? "orange2" : "black3"} fontSize="body1-m">
          {label}
        </Typography>
        {selected && <Icon color="orange2" name="check" size="24" />}
      </Box>
    </DialogClose>
  );
};
